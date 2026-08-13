import Link from "next/link";
import { notFound } from "next/navigation";
import { adminDb } from "@/lib/admin-auth";
import type { Booking, Driver } from "@/lib/supabase/types";
import BookingEditor from "@/components/admin/BookingEditor";
import { BookingBadge, PaymentBadge, inr, istDate, istDateTime } from "@/components/admin/ui";
import { whatsappBookingLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export default async function BookingDetailPage({ params }: { params: { id: string } }) {
  const db = await adminDb();

  const [{ data: booking }, { data: drivers }] = await Promise.all([
    db.from("bookings").select("*").eq("id", params.id).maybeSingle<Booking>(),
    db
      .from("drivers")
      .select("id, name, phone, vehicle_no")
      .eq("active", true)
      .order("name")
      .returns<Pick<Driver, "id" | "name" | "phone" | "vehicle_no">[]>(),
  ]);

  if (!booking) notFound();

  const waLink = whatsappBookingLink({
    from: booking.from_label,
    to: booking.to_label,
    date: booking.pickup_date ?? "",
    time: booking.pickup_time ?? "",
    trip: booking.trip_type,
    km: Number(booking.distance_km ?? 0),
    vehicle: booking.vehicle_name ?? "—",
    fare: Number(booking.fare_total),
    bookingCode: booking.booking_code,
    customerName: booking.customer_name,
  });

  return (
    <>
      <Link
        href="/admin/bookings"
        className="text-xs font-bold uppercase tracking-widest text-ink-muted hover:text-ink"
      >
        ← All bookings
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <h1 className="display text-3xl sm:text-4xl">{booking.booking_code}</h1>
        <div className="flex gap-2">
          <BookingBadge status={booking.status} />
          <PaymentBadge status={booking.payment_status} />
        </div>
      </div>
      <p className="mt-2 text-sm text-ink-muted">
        Booked {istDateTime(booking.created_at)} · via {booking.source}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="grid gap-6">
          <section className="card p-6">
            <h2 className="card-title-lg">Customer</h2>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Name" value={booking.customer_name} />
              <Field
                label="Phone"
                value={
                  <a href={`tel:+91${booking.phone}`} className="hover:text-taxi-deep">
                    +91 {booking.phone}
                  </a>
                }
              />
              <Field label="Email" value={booking.email || "—"} />
              <Field
                label="WhatsApp"
                value={
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-taxi-deep"
                  >
                    Open chat →
                  </a>
                }
              />
            </dl>
            {booking.customer_note && (
              <div className="mt-5 rounded-xl border border-ink/[0.08] bg-paper/80 p-4">
                <div className="text-[11px] font-bold uppercase tracking-widest text-ink-muted">
                  Customer note
                </div>
                <p className="mt-1.5 text-sm">{booking.customer_note}</p>
              </div>
            )}
          </section>

          <section className="card p-6">
            <h2 className="card-title-lg">Trip</h2>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Pickup" value={booking.from_label} wide />
              <Field label="Drop" value={booking.to_label} wide />
              <Field label="Date" value={istDate(booking.pickup_date)} />
              <Field label="Time" value={booking.pickup_time || "—"} />
              <Field label="Trip type" value={booking.trip_type} />
              <Field
                label="Distance"
                value={
                  <>
                    {booking.distance_km} km
                    {booking.distance_is_estimate && (
                      <span className="ml-2 text-[11px] font-bold uppercase tracking-widest text-ink-muted">
                        estimated
                      </span>
                    )}
                  </>
                }
              />
            </dl>
            {booking.distance_is_estimate && (
              <p className="mt-5 rounded-lg border border-ink/15 bg-taxi/15 px-4 py-2.5 text-xs font-medium">
                Live routing was unavailable when this was booked — the distance is a
                straight-line estimate. Confirm the fare with the customer before dispatch.
              </p>
            )}
          </section>

          <section className="card p-6">
            <h2 className="card-title-lg">Pricing</h2>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Cab" value={booking.vehicle_name ?? "—"} />
              <Field
                label="Rate at booking"
                value={booking.rate_per_km ? `${inr(booking.rate_per_km)}/km` : "—"}
              />
              <Field label="Total fare" value={inr(booking.fare_total)} strong />
              <Field label="Amount paid" value={inr(booking.amount_paid)} />
            </dl>
            <p className="mt-5 text-[11px] text-ink-muted">
              Fare was calculated server-side from the rate stored above, so it reflects the
              price the customer was actually shown even if rates change later.
            </p>
          </section>
        </div>

        <div className="lg:sticky lg:top-8 lg:self-start">
          <BookingEditor booking={booking} drivers={drivers ?? []} />
        </div>
      </div>
    </>
  );
}

function Field({
  label,
  value,
  wide,
  strong,
}: {
  label: string;
  value: React.ReactNode;
  wide?: boolean;
  strong?: boolean;
}) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <dt className="text-[11px] font-bold uppercase tracking-widest text-ink-muted">
        {label}
      </dt>
      <dd className={`mt-1 ${strong ? "num-taxi text-2xl" : "text-sm font-semibold"}`}>
        {value}
      </dd>
    </div>
  );
}
