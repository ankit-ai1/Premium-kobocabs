"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { autocomplete, type Place } from "@/lib/geo";

const field = "input";

export default function PlaceField({
  id,
  label,
  icon,
  placeholder,
  query,
  onQueryChange,
  onPick,
}: {
  id: string;
  label: string;
  icon: ReactNode;
  placeholder: string;
  query: string;
  /** Fired on every keystroke — the parent should clear its stored Place. */
  onQueryChange: (q: string) => void;
  /** Fired when a suggestion is chosen. */
  onPick: (p: Place) => void;
}) {
  const [results, setResults] = useState<Place[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  // Set right after a pick so the resulting query change doesn't re-search.
  const justPicked = useRef(false);

  // Local suggestions can start immediately; remote lookup remains limited to
  // 3+ characters to respect Nominatim's fair-use policy.
  useEffect(() => {
    if (justPicked.current) {
      justPicked.current = false;
      return;
    }
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    let cancelled = false;
    const t = setTimeout(async () => {
      const found = await autocomplete(query);
      if (cancelled) return;
      setResults(found);
      setLoading(false);
      setOpen(true);
    }, 500);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [query]);

  // Close the dropdown when clicking anywhere else.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const pick = (p: Place) => {
    justPicked.current = true;
    onPick(p);
    setResults([]);
    setOpen(false);
  };

  return (
    <div ref={box} className="relative">
      <label
        className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-ink-muted"
        htmlFor={id}
      >
        {icon} {label}
      </label>
      <input
        id={id}
        className={field}
        placeholder={placeholder}
        value={query}
        autoComplete="off"
        onChange={(e) => onQueryChange(e.target.value)}
        onFocus={() => results.length && setOpen(true)}
      />

      {loading && (
        <span className="absolute right-3 top-[38px] text-[11px] font-semibold uppercase tracking-widest text-ink-muted">
          Searching…
        </span>
      )}

      {open && results.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-30 mt-1 max-h-60 overflow-y-auto rounded-lg border border-ink/15 bg-white shadow-[0_16px_40px_-12px_rgba(11,11,11,0.3)]">
          {results.map((p) => (
            <li key={`${p.lat},${p.lon}`}>
              <button
                type="button"
                onClick={() => pick(p)}
                className="block w-full px-3 py-2.5 text-left text-[13px] leading-snug text-ink transition-colors hover:bg-taxi/20"
              >
                {p.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
