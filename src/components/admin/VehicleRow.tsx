"use client";

import { useState, useTransition } from "react";
import { updateVehicle } from "@/app/admin/(dashboard)/actions";
import type { Vehicle } from "@/lib/supabase/types";

/**
 * Editable fare card row.
 *
 * Changing a rate here changes what the public quote page shows on its next
 * load. Bookings already taken keep the rate they were priced at.
 */
export default function VehicleRow({ vehicle }: { vehicle: Vehicle }) {
  const [pending, start] = useTransition();
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setMessage(null);
    start(async () => {
      const result = await updateVehicle(formData);
      setMessage(result.ok ? { ok: true, text: "Saved" } : { ok: false, text: result.error });
    });
  };

  const label = "mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-ink-muted";

  return (
    <form onSubmit={onSubmit} className="card p-5">
      <input type="hidden" name="id" value={vehicle.id} />

      <div className="flex flex-wrap items-end gap-4">
        <div className="min-w-[160px] flex-1">
          <label className={label} htmlFor={`name-${vehicle.id}`}>
            Cab name
          </label>
          <input
            id={`name-${vehicle.id}`}
            name="name"
            defaultValue={vehicle.name}
            className="input"
          />
          <p className="mt-1 text-[11px] text-ink-muted">slug: {vehicle.slug}</p>
        </div>

        <div className="w-28">
          <label className={label} htmlFor={`ow-${vehicle.id}`}>
            ₹/km one way
          </label>
          <input
            id={`ow-${vehicle.id}`}
            name="rate_one_way"
            type="number"
            step="0.5"
            min="1"
            defaultValue={Number(vehicle.rate_one_way)}
            className="input"
          />
        </div>

        <div className="w-28">
          <label className={label} htmlFor={`rt-${vehicle.id}`}>
            ₹/km round trip
          </label>
          <input
            id={`rt-${vehicle.id}`}
            name="rate_round_trip"
            type="number"
            step="0.5"
            min="1"
            defaultValue={Number(vehicle.rate_round_trip)}
            className="input"
          />
        </div>

        <div className="w-24">
          <label className={label} htmlFor={`seats-${vehicle.id}`}>
            Seats
          </label>
          <input
            id={`seats-${vehicle.id}`}
            name="seats"
            type="number"
            min="1"
            max="60"
            defaultValue={vehicle.seats}
            className="input"
          />
        </div>

        <label className="flex items-center gap-2 pb-3 text-xs font-bold uppercase tracking-widest text-ink-muted">
          <input
            type="checkbox"
            name="active"
            defaultChecked={vehicle.active}
            className="h-4 w-4 accent-taxi"
          />
          Live
        </label>

        <button disabled={pending} className="btn-ink !py-3 text-xs disabled:opacity-60">
          {pending ? "Saving…" : "Save"}
        </button>

        {message && (
          <span
            className={`pb-3 text-xs font-semibold ${
              message.ok ? "text-emerald-700" : "text-rose-700"
            }`}
          >
            {message.text}
          </span>
        )}
      </div>
    </form>
  );
}
