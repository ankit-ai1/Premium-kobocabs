import Link from "next/link";
import { adminDb } from "@/lib/admin-auth";
import type { Booking, Driver } from "@/lib/supabase/types";
import {
  BookingBadge,
  EmptyState,
  PaymentBadge,
  inr,
  istDate,
  istDateTime,
} from "@/components/admin/ui";

export const dynamic = "force-dynamic";

const STATUSES = ["all", "pending", "confirmed", "assigned", "completed", "cancelled"] as const;

type BookingRow = Booking & { drivers: Pick<Driver, "name" | "phone"> | null };

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: { status?: string; q?: string };
}) {
  const status = STATUSES.includes(searchParams.status as (typeof STATUSES)[number])
    ? searchParams.status!
    : "all";
  const q = (searchParams.q ?? "").trim();

  const db = await adminDb();
  let query = db
    .from("bookings")
    .select("*, drivers ( name, phone )")
    .order("created_at", { ascending: false })
    .limit(100);

  if (status !== "all") query = query.eq("status", status);
  if (q) {
    // Commas would be parsed as extra filters by PostgREST, so strip them.
    const safe = q.replace(/[,()]/g, " ");
    query = query.or(
      `booking_code.ilike.%${safe}%,customer_name.ilike.%${safe}%,phone.ilike.%${safe}%`
    );
  }

  const { data, error } = await query.returns<BookingRow[]>();

  return (
    <>
      <h1 className="display text-3xl sm:text-4xl">
        Book<span className="hi">ings</span>
      </h1>

      {/* Filters — plain GET form so every view is a shareable URL. */}
      <form className="mt-7 flex flex-wrap items-end gap-3">
        <div className="min-w-[220px] flex-1">
          <label
            htmlFor="q"
            className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-ink-muted"
          >
            Search
          </label>
          <input
            id="q"
            name="q"
            defaultValue={q}
            placeholder="Booking code, name or phone"
            className="input"
          />
        </div>
        <div>
          <label
            htmlFor="status"
            className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-ink-muted"
          >
            Status
          </label>
          <select id="status" name="status" defaultValue={status} className="input">
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s === "all" ? "All statuses" : s}
              </option>
            ))}
          </select>
        </div>
        <button className="btn-ink !py-3 text-xs">Apply</button>
        {(q || status !== "all") && (
          <Link href="/admin/bookings" className="btn-outline !py-3 text-xs">
            Reset
          </Link>
        )}
      </form>

      {error && (
        <p className="mt-6 rounded-lg border border-ink/15 bg-taxi/15 px-4 py-3 text-sm">
          Could not load bookings: {error.message}
        </p>
      )}

      <div className="mt-6">
        {data?.length ? (
          <div className="card overflow-x-auto">
            <table className="w-full min-w-[980px] text-sm">
              <thead>
                <tr className="border-b border-ink/[0.08] text-left text-[11px] uppercase tracking-widest text-ink-muted">
                  <th className="px-5 py-3.5 font-bold">Code / Booked</th>
                  <th className="px-5 py-3.5 font-bold">Customer</th>
                  <th className="px-5 py-3.5 font-bold">Trip</th>
                  <th className="px-5 py-3.5 font-bold">Pickup</th>
                  <th className="px-5 py-3.5 font-bold">Cab</th>
                  <th className="px-5 py-3.5 font-bold">Driver</th>
                  <th className="px-5 py-3.5 font-bold">Fare</th>
                  <th className="px-5 py-3.5 font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((b) => (
                  <tr
                    key={b.id}
                    className="border-b border-ink/[0.05] last:border-0 hover:bg-ink/[0.02]"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/bookings/${b.id}`}
                        className="font-bold hover:text-taxi-deep"
                      >
                        {b.booking_code}
                      </Link>
                      <div className="text-[11px] text-ink-muted">
                        {istDateTime(b.created_at)}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-semibold">{b.customer_name}</div>
                      <a href={`tel:+91${b.phone}`} className="text-xs text-ink-muted hover:text-ink">
                        {b.phone}
                      </a>
                    </td>
                    <td className="max-w-[220px] px-5 py-4 text-xs">
                      <div className="truncate font-medium">{b.from_label.split(",")[0]}</div>
                      <div className="truncate text-ink-muted">→ {b.to_label.split(",")[0]}</div>
                      <div className="text-ink-muted">
                        {b.distance_km} km · {b.trip_type}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs">
                      <div>{istDate(b.pickup_date)}</div>
                      <div className="text-ink-muted">{b.pickup_time || "—"}</div>
                    </td>
                    <td className="px-5 py-4 text-xs font-medium">{b.vehicle_name ?? "—"}</td>
                    <td className="px-5 py-4 text-xs">
                      {b.drivers ? (
                        <>
                          <div className="font-medium">{b.drivers.name}</div>
                          <div className="text-ink-muted">{b.drivers.phone}</div>
                        </>
                      ) : (
                        <span className="text-ink-muted">Unassigned</span>
                      )}
                    </td>
                    <td className="px-5 py-4 font-bold">{inr(b.fare_total)}</td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1.5">
                        <BookingBadge status={b.status} />
                        <PaymentBadge status={b.payment_status} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !error && <EmptyState>No bookings match this filter.</EmptyState>
        )}
      </div>
    </>
  );
}
