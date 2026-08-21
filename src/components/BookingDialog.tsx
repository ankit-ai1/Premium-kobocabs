"use client";

import { useEffect, useRef, useState } from "react";
import { whatsappBookingLink } from "@/lib/whatsapp";
import { fareNote } from "@/data/site";
import { Arrow, Chat } from "./Icons";

export type BookingDraft = {
  from: { label: string; lat: number; lon: number };
  to: { label: string; lat: number; lon: number };
  date: string;
  time: string;
  tripType: string;
  vehicleSlug: string;
  vehicleName: string;
  /**
   * Estimate shown on the card, or null when the rate is quoted on request.
   * The server recomputes the real figure either way.
   */
  estimatedFare: number | null;
  estimatedKm: number;
};

type Result = {
  bookingCode: string;
  fareTotal: number;
  distanceKm: number;
  vehicleName: string;
};

/**
 * Collects the contact details a booking needs, saves it, then hands over to
 * WhatsApp with the booking code already in the message.
 *
 * The saved fare is whatever the server calculated — if it differs from the
 * card estimate (rates changed, routing differed) we show the confirmed figure
 * rather than the one the user tapped.
 */
export default function BookingDialog({
  draft,
  onClose,
}: {
  draft: BookingDraft;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", note: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const firstField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstField.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const whatsappFor = (r: Result) =>
    whatsappBookingLink({
      from: draft.from.label,
      to: draft.to.label,
      date: draft.date,
      time: draft.time,
      trip: draft.tripType,
      km: r.distanceKm,
      vehicle: r.vehicleName,
      fare: r.fareTotal,
      bookingCode: r.bookingCode,
      customerName: form.name,
    });

  const submit = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          phone: form.phone,
          email: form.email,
          note: form.note,
          from: draft.from,
          to: draft.to,
          date: draft.date,
          time: draft.time,
          tripType: draft.tripType,
          vehicleSlug: draft.vehicleSlug,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setResult(data as Result);
      // Popup blockers only allow this because we're still inside the click's
      // task chain via the await — if it's blocked the button below is the
      // fallback.
      window.open(whatsappFor(data as Result), "_blank");
    } catch {
      setError("Network error. Please check your connection or WhatsApp us.");
    } finally {
      setBusy(false);
    }
  };

  const label = "mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-ink-muted";

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-ink/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Confirm your booking"
    >
      <div
        className="card max-h-[90vh] w-full max-w-lg overflow-y-auto p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {result ? (
          <div className="text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-taxi">
              <Chat className="h-6 w-6 text-ink" />
            </div>
            <h3 className="card-title-lg mt-5">Booking Received</h3>
            <p className="mt-2 text-sm text-ink-muted">
              Your reference is{" "}
              <span className="font-bold text-ink">{result.bookingCode}</span>. We&apos;ll
              confirm your driver on WhatsApp shortly.
            </p>

            <div className="mt-6 rounded-xl border border-ink/[0.08] bg-paper/80 px-4 py-4 text-left">
              <Row k="Cab" v={result.vehicleName} />
              <Row k="Distance" v={`${result.distanceKm} km`} />
              <Row
                k="Confirmed fare"
                v={`₹${Number(result.fareTotal).toLocaleString("en-IN")}`}
                strong
              />
            </div>

            <p className="mt-4 text-left text-[11px] leading-relaxed text-ink-muted">
              {fareNote.long}
            </p>

            <a
              href={whatsappFor(result)}
              target="_blank"
              rel="noreferrer"
              /* The booking is already saved — it belongs in Bookings, not the
                 WhatsApp lead list. */
              data-wa-skip=""
              className="btn-taxi mt-6 w-full"
            >
              <Chat className="h-4 w-4" /> Continue on WhatsApp
            </a>
            <button
              onClick={onClose}
              className="mt-3 w-full text-xs font-bold uppercase tracking-widest text-ink-muted hover:text-ink"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 className="card-title-lg">Confirm your booking</h3>
            <p className="mt-2 text-sm text-ink-muted">
              {draft.vehicleName} · {draft.from.label.split(",")[0]} →{" "}
              {draft.to.label.split(",")[0]} ·{" "}
              {draft.estimatedFare === null
                ? "rate on request"
                : `approx ₹${draft.estimatedFare.toLocaleString("en-IN")}`}
            </p>

            <div className="mt-6 grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={label} htmlFor="bd-name">
                    Full Name *
                  </label>
                  <input
                    id="bd-name"
                    ref={firstField}
                    className="input"
                    placeholder="Rahul Sharma"
                    value={form.name}
                    onChange={set("name")}
                  />
                </div>
                <div>
                  <label className={label} htmlFor="bd-phone">
                    Mobile Number *
                  </label>
                  <input
                    id="bd-phone"
                    className="input"
                    inputMode="numeric"
                    placeholder="98765 43210"
                    value={form.phone}
                    onChange={set("phone")}
                  />
                </div>
              </div>
              <div>
                <label className={label} htmlFor="bd-email">
                  Email <span className="normal-case tracking-normal">(optional)</span>
                </label>
                <input
                  id="bd-email"
                  className="input"
                  placeholder="rahul@example.com"
                  value={form.email}
                  onChange={set("email")}
                />
              </div>
              <div>
                <label className={label} htmlFor="bd-note">
                  Anything we should know?{" "}
                  <span className="normal-case tracking-normal">(optional)</span>
                </label>
                <textarea
                  id="bd-note"
                  rows={3}
                  className="input resize-none"
                  placeholder="2 large suitcases, need a child seat…"
                  value={form.note}
                  onChange={set("note")}
                />
              </div>

              {error && (
                <p className="rounded-lg border border-ink/15 bg-taxi/15 px-4 py-2.5 text-xs font-medium text-ink">
                  {error}
                </p>
              )}

              <button onClick={submit} disabled={busy} className="btn-taxi w-full disabled:opacity-60">
                {busy ? "Saving…" : "Confirm Booking"} <Arrow className="h-4 w-4" />
              </button>
              <button
                onClick={onClose}
                className="text-xs font-bold uppercase tracking-widest text-ink-muted hover:text-ink"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Row({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-ink-muted">{k}</span>
      <span className={strong ? "num-taxi text-lg" : "font-semibold"}>{v}</span>
    </div>
  );
}
