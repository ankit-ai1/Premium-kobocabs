"use client";

import { useState, useTransition } from "react";
import { updateBooking } from "@/app/admin/(dashboard)/actions";
import type { Booking, Driver } from "@/lib/supabase/types";

const BOOKING_STATUSES = ["pending", "confirmed", "assigned", "completed", "cancelled"];
const PAYMENT_STATUSES = ["unpaid", "advance_paid", "paid", "refunded", "failed"];

/**
 * Workflow controls for one booking.
 *
 * Deliberately does not expose fare or trip fields — those are the priced
 * record of what the customer agreed to. Corrections go through a note, so the
 * original quote stays auditable once payments are live.
 */
export default function BookingEditor({
  booking,
  drivers,
}: {
  booking: Booking;
  drivers: Pick<Driver, "id" | "name" | "phone" | "vehicle_no">[];
}) {
  const [pending, start] = useTransition();
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setMessage(null);
    start(async () => {
      const result = await updateBooking(formData);
      setMessage(
        result.ok
          ? { ok: true, text: "Saved." }
          : { ok: false, text: result.error }
      );
    });
  };

  const label = "mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-ink-muted";

  return (
    <form onSubmit={onSubmit} className="card p-6">
      <h2 className="card-title-lg">Manage</h2>
      <input type="hidden" name="id" value={booking.id} />

      <div className="mt-5 grid gap-5">
        <div>
          <label className={label} htmlFor="status">
            Booking status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={booking.status}
            className="input"
          >
            {BOOKING_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={label} htmlFor="payment_status">
            Payment status
          </label>
          <select
            id="payment_status"
            name="payment_status"
            defaultValue={booking.payment_status}
            className="input"
          >
            {PAYMENT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.replace("_", " ")}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-[11px] text-ink-muted">
            Set by hand for now. Once Razorpay is live this is written by the payment
            webhook instead.
          </p>
        </div>

        <div>
          <label className={label} htmlFor="driver_id">
            Assigned driver
          </label>
          <select
            id="driver_id"
            name="driver_id"
            defaultValue={booking.driver_id ?? ""}
            className="input"
          >
            <option value="">Unassigned</option>
            {drivers.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} · {d.phone}
                {d.vehicle_no ? ` · ${d.vehicle_no}` : ""}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={label} htmlFor="admin_notes">
            Internal notes
          </label>
          <textarea
            id="admin_notes"
            name="admin_notes"
            rows={4}
            defaultValue={booking.admin_notes ?? ""}
            placeholder="Called customer, pickup shifted to 7am…"
            className="input resize-none"
          />
        </div>

        {message && (
          <p
            className={`rounded-lg px-4 py-2.5 text-xs font-semibold ${
              message.ok
                ? "bg-emerald-100 text-emerald-900"
                : "border border-ink/15 bg-taxi/15 text-ink"
            }`}
          >
            {message.text}
          </p>
        )}

        <button disabled={pending} className="btn-taxi w-full disabled:opacity-60">
          {pending ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
