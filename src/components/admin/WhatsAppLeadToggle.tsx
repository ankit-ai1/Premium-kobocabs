"use client";

import { useState, useTransition } from "react";
import { setWhatsAppLeadHandled } from "@/app/admin/(dashboard)/actions";

/** Marks a WhatsApp hand-off as dealt with. Saves on click, no submit button. */
export default function WhatsAppLeadToggle({
  id,
  handled,
}: {
  id: string;
  handled: boolean;
}) {
  const [pending, start] = useTransition();
  const [value, setValue] = useState(handled);
  const [error, setError] = useState(false);

  return (
    <div className="text-right">
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          const next = !value;
          setValue(next);
          setError(false);
          const formData = new FormData();
          formData.set("id", id);
          formData.set("handled", String(next));
          start(async () => {
            const result = await setWhatsAppLeadHandled(formData);
            if (!result.ok) {
              setValue(!next); // roll back so the UI can't lie about what's stored
              setError(true);
            }
          });
        }}
        className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors disabled:opacity-60 ${
          value
            ? "bg-emerald-100 text-emerald-900"
            : "border border-ink/15 text-ink-muted hover:text-ink"
        }`}
      >
        {value ? "Handled" : "Mark handled"}
      </button>
      {error && <p className="mt-1 text-[11px] font-semibold text-rose-700">Failed to save</p>}
    </div>
  );
}
