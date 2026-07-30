"use client";

import { useState } from "react";
import { Plus } from "./Icons";

export default function Faq({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {items.map((item, i) => {
        const active = open === i;
        return (
          <div
            key={item.q}
            // Open state is a white card with a yellow left accent rather than
            // a solid yellow fill, which reads far softer on light sections.
            className={`card overflow-hidden border-l-4 ${
              active ? "border-l-taxi" : "border-l-transparent"
            }`}
          >
            <button
              onClick={() => setOpen(active ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
              aria-expanded={active}
            >
              <span className="card-title pr-2">{item.q}</span>
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ease-out ${
                  active ? "rotate-45 bg-taxi text-ink" : "bg-ink/[0.06] text-ink"
                }`}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>

            <div
              className={`grid transition-all duration-300 ease-out ${
                active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-[0.9375rem] leading-relaxed text-ink-muted sm:px-6">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
