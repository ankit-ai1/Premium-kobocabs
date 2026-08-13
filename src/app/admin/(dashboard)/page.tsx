import Link from "next/link";
import { adminDb } from "@/lib/admin-auth";
import type { Booking } from "@/lib/supabase/types";
import {
  BookingBadge,
  EmptyState,
  PaymentBadge,
  StatCard,
  inr,
  istDate,
} from "@/components/admin/ui";

export const dynamic = "force-dynamic";

/** Midnight IST today, as an ISO instant Postgres can compare against. */
function startOfTodayIST(): string {
  const nowIST = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
  const y = nowIST.getUTCFullYear();
  const m = String(nowIST.getUTCMonth() + 1).padStart(2, "0");
  const d = String(nowIST.getUTCDate()).padStart(2, "0");
  return new Date(`${y}-${m}-${d}T00:00:00+05:30`).toISOString();
}

function startOfMonthIST(): string {
  const nowIST = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
  const y = nowIST.getUTCFullYear();
  const m = String(nowIST.getUTCMonth() + 1).padStart(2, "0");
  return new Date(`${y}-${m}-01T00:00:00+05:30`).toISOString();
}

export default async function AdminDashboard() {
  const db = await adminDb();
  const todayStart = startOfTodayIST();
  const monthStart = startOfMonthIST();

  const [recent, todayCount, pendingCount, newEnquiries, monthBookings] = await Promise.all([
    db
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(8)
      .returns<Booking[]>(),
    db
      .from("bookings")
      .select("id", { count: "exact", head: true })
      .gte("created_at", todayStart),
    db
      .from("bookings")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending"),
    db
      .from("enquiries")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
    db
      .from("bookings")
      .select("fare_total")
      .gte("created_at", monthStart)
      .neq("status", "cancelled")
      .returns<{ fare_total: number }[]>(),
  ]);

  const monthValue = (monthBookings.data ?? []).reduce(
    (sum, b) => sum + Number(b.fare_total ?? 0),
    0
  );

  return (
    <>
      <h1 className="display text-3xl sm:text-4xl">
        Dash<span className="hi">board</span>
      </h1>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Bookings today" value={String(todayCount.count ?? 0)} />
        <StatCard
          label="Awaiting action"
          value={String(pendingCount.count ?? 0)}
          sub="Status still pending"
        />
        <StatCard
          label="New enquiries"
          value={String(newEnquiries.count ?? 0)}
          sub="Not yet contacted"
        />
        <StatCard
          label="This month"
          value={inr(monthValue)}
          sub="Booked value, excludes cancelled"
        />
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="display text-xl">Latest Bookings</h2>
        <Link
          href="/admin/bookings"
          className="text-xs font-bold uppercase tracking-widest text-ink-muted hover:text-ink"
        >
          View all →
        </Link>
      </div>

      <div className="mt-4">
        {recent.data?.length ? (
          <div className="card overflow-x-auto">
            <table className="w-full min-w-[820px] text-sm">
              <thead>
                <tr className="border-b border-ink/[0.08] text-left text-[11px] uppercase tracking-widest text-ink-muted">
                  <th className="px-5 py-3.5 font-bold">Code</th>
                  <th className="px-5 py-3.5 font-bold">Customer</th>
                  <th className="px-5 py-3.5 font-bold">Trip</th>
                  <th className="px-5 py-3.5 font-bold">Pickup</th>
                  <th className="px-5 py-3.5 font-bold">Fare</th>
                  <th className="px-5 py-3.5 font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.data.map((b) => (
                  <tr key={b.id} className="border-b border-ink/[0.05] last:border-0 hover:bg-ink/[0.02]">
                    <td className="px-5 py-4">
                      <Link href={`/admin/bookings/${b.id}`} className="font-bold hover:text-taxi-deep">
                        {b.booking_code}
                      </Link>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-semibold">{b.customer_name}</div>
                      <div className="text-xs text-ink-muted">{b.phone}</div>
                    </td>
                    <td className="max-w-[240px] px-5 py-4 text-xs">
                      <div className="truncate font-medium">{b.from_label.split(",")[0]}</div>
                      <div className="truncate text-ink-muted">
                        → {b.to_label.split(",")[0]}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs">
                      <div>{istDate(b.pickup_date)}</div>
                      <div className="text-ink-muted">{b.pickup_time || "—"}</div>
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
          <EmptyState>
            No bookings yet. They&apos;ll appear here the moment someone books from the site.
          </EmptyState>
        )}
      </div>
    </>
  );
}
