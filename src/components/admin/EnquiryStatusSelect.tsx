"use client";

import { useState, useTransition } from "react";
import { setEnquiryStatus } from "@/app/admin/(dashboard)/actions";
import type { EnquiryStatus } from "@/lib/supabase/types";

const STATUSES: EnquiryStatus[] = ["new", "contacted", "converted", "closed"];

/** Inline status change — saves on select, no separate submit button. */
export default function EnquiryStatusSelect({
  id,
  status,
}: {
  id: string;
  status: EnquiryStatus;
}) {
  const [pending, start] = useTransition();
  const [value, setValue] = useState<EnquiryStatus>(status);
  const [error, setError] = useState(false);

  return (
    <div>
      <select
        aria-label="Enquiry status"
        disabled={pending}
        value={value}
        onChange={(e) => {
          const next = e.target.value as EnquiryStatus;
          const previous = value;
          setValue(next);
          setError(false);
          const formData = new FormData();
          formData.set("id", id);
          formData.set("status", next);
          start(async () => {
            const result = await setEnquiryStatus(formData);
            if (!result.ok) {
              setValue(previous); // roll back so the UI can't lie about what's stored
              setError(true);
            }
          });
        }}
        className="input !py-2 text-xs disabled:opacity-60"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-[11px] font-semibold text-rose-700">Failed to save</p>}
    </div>
  );
}
