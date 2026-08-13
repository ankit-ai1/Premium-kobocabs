"use client";

import { useRef, useState, useTransition } from "react";
import { saveDriver } from "@/app/admin/(dashboard)/actions";
import type { Driver } from "@/lib/supabase/types";

/** Add a driver, or edit one in place when `driver` is supplied. */
export default function DriverForm({ driver }: { driver?: Driver }) {
  const [pending, start] = useTransition();
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isNew = !driver;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setMessage(null);
    start(async () => {
      const result = await saveDriver(formData);
      if (result.ok) {
        setMessage({ ok: true, text: isNew ? "Driver added." : "Saved." });
        if (isNew) formRef.current?.reset();
      } else {
        setMessage({ ok: false, text: result.error });
      }
    });
  };

  const label = "mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-ink-muted";
  const uid = driver?.id ?? "new";

  return (
    <form ref={formRef} onSubmit={onSubmit} className="card p-5">
      {driver && <input type="hidden" name="id" value={driver.id} />}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className={label} htmlFor={`name-${uid}`}>
            Name *
          </label>
          <input
            id={`name-${uid}`}
            name="name"
            required
            defaultValue={driver?.name}
            placeholder="Ramesh Kumar"
            className="input"
          />
        </div>
        <div>
          <label className={label} htmlFor={`phone-${uid}`}>
            Mobile *
          </label>
          <input
            id={`phone-${uid}`}
            name="phone"
            required
            inputMode="numeric"
            defaultValue={driver?.phone}
            placeholder="98765 43210"
            className="input"
          />
        </div>
        <div>
          <label className={label} htmlFor={`vehicle-${uid}`}>
            Vehicle number
          </label>
          <input
            id={`vehicle-${uid}`}
            name="vehicle_no"
            defaultValue={driver?.vehicle_no ?? ""}
            placeholder="UP25 AB 1234"
            className="input"
          />
        </div>
        <div>
          <label className={label} htmlFor={`license-${uid}`}>
            Licence number
          </label>
          <input
            id={`license-${uid}`}
            name="license_no"
            defaultValue={driver?.license_no ?? ""}
            className="input"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className={label} htmlFor={`notes-${uid}`}>
          Notes
        </label>
        <input
          id={`notes-${uid}`}
          name="notes"
          defaultValue={driver?.notes ?? ""}
          placeholder="Speaks English, prefers hill routes…"
          className="input"
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink-muted">
          <input
            type="checkbox"
            name="active"
            defaultChecked={driver ? driver.active : true}
            className="h-4 w-4 accent-taxi"
          />
          Available for assignment
        </label>

        <button disabled={pending} className="btn-taxi !py-3 text-xs disabled:opacity-60">
          {pending ? "Saving…" : isNew ? "Add Driver" : "Save"}
        </button>

        {message && (
          <span
            className={`text-xs font-semibold ${
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
