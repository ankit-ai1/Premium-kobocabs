"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { premiumCabs, site } from "@/data/site";
import { Search, Pin, Route, Clock, Calendar, Car } from "./Icons";
import PlaceField from "./PlaceField";
import { autocomplete, type Place } from "@/lib/geo";
import { logWhatsApp } from "@/lib/wa-log";

type Point = { query: string; place: Place | null };

/** Today in the user's own timezone — toISOString() would shift the date. */
function localTodayStr() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
}

const LEAD_MS = 3 * 60 * 60 * 1000; // bookings need 3 hours' notice

function isAtLeast3hAhead(dateStr: string, timeStr: string) {
  if (!dateStr || !timeStr) return false;
  return new Date(`${dateStr}T${timeStr}`).getTime() >= Date.now() + LEAD_MS;
}

/** Earliest bookable clock time, but only meaningful when the date is today. */
function earliestTimeToday() {
  const t = new Date(Date.now() + LEAD_MS);
  // Rolled past midnight — every time today is already too late.
  if (t.toDateString() !== new Date().toDateString()) return null;
  return `${String(t.getHours()).padStart(2, "0")}:${String(
    t.getMinutes()
  ).padStart(2, "0")}`;
}

export default function BookingWidget({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [pickup, setPickup] = useState<Point>({ query: "", place: null });
  const [drop, setDrop] = useState<Point>({ query: "", place: null });
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    date: "",
    time: "10:00",
    trip: "One Way",
    cab: "Sedan",
    returnDate: "",
  });

  useEffect(() => {
    let cancelled = false;
    let version = 0;

    const prefillFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const from = params.get("from")?.trim();
      const to = params.get("to")?.trim();
      const cab = params.get("cab")?.trim();
      if (!from && !to && !cab) return;

      const current = ++version;
      if (cab && premiumCabs.some((c) => c.name === cab)) {
        setForm((f) => ({ ...f, cab }));
      }

      const fill = async (
        value: string | undefined,
        setter: React.Dispatch<React.SetStateAction<Point>>
      ) => {
        if (!value) return;
        setter({ query: value, place: null });
        const [place] = await autocomplete(value);
        if (!cancelled && current === version && place) {
          setter({ query: place.label, place });
        }
      };

      fill(from, setPickup);
      fill(to, setDrop);
    };

    prefillFromUrl();
    window.addEventListener("booking-route-change", prefillFromUrl);
    window.addEventListener("booking-prefill-change", prefillFromUrl);
    window.addEventListener("popstate", prefillFromUrl);

    return () => {
      cancelled = true;
      window.removeEventListener("booking-route-change", prefillFromUrl);
      window.removeEventListener("booking-prefill-change", prefillFromUrl);
      window.removeEventListener("popstate", prefillFromUrl);
    };
  }, []);

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) =>
    setForm((f) => {
      const next = { ...f, [k]: e.target.value };
      // One Way has no return leg — clear the date so a stale value can't
      // travel with the booking.
      if (k === "trip" && e.target.value === "One Way") next.returnDate = "";
      return next;
    });

  const today = localTodayStr();
  const isToday = form.date === today;
  const needsReturn = form.trip === "Round Trip";
  const minTime = isToday ? earliestTimeToday() ?? "23:59" : undefined;

  /** Fallback when we have no coordinates: hand the trip straight to WhatsApp. */
  const sendOnWhatsApp = () => {
    const back = form.returnDate ? `, returning ${form.returnDate}` : "";
    const msg = `Hi YantraCabs! I'd like to book a ${form.cab} (${form.trip}) from ${
      pickup.query || "—"
    } to ${drop.query || "—"} on ${form.date || "—"} at ${form.time}${back}.`;
    logWhatsApp({
      kind: "booking_widget",
      label: "Booking widget — WhatsApp fallback",
      message: msg,
    });
    window.open(`${site.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const submit = () => {
    if (!pickup.place || !drop.place) {
      setError(
        "Pick a suggestion from the dropdown for both locations so we can calculate the distance."
      );
      return;
    }
    if (!form.date || !form.time) {
      setError("Please choose your travel date and pickup time.");
      return;
    }
    if (!isAtLeast3hAhead(form.date, form.time)) {
      setError(
        isToday && !earliestTimeToday()
          ? "We need 3 hours' notice — please pick tomorrow or later."
          : "Please choose a pickup time at least 3 hours from now."
      );
      return;
    }
    if (needsReturn && !form.returnDate) {
      setError("Round trips need a return date.");
      return;
    }
    if (needsReturn && form.returnDate < form.date) {
      setError("The return date can't be before the travel date.");
      return;
    }
    setError("");
    const q = new URLSearchParams({
      from: pickup.place.label,
      fromLat: String(pickup.place.lat),
      fromLon: String(pickup.place.lon),
      to: drop.place.label,
      toLat: String(drop.place.lat),
      toLon: String(drop.place.lon),
      date: form.date,
      time: form.time,
      trip: form.trip,
      cab: form.cab,
      returnDate: form.returnDate,
    });
    router.push(`/quote?${q.toString()}`);
  };

  const field = "input";
  const label =
    "mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-ink-muted";
  const icon = "h-3.5 w-3.5 text-taxi";

  return (
    <div className="rounded-2xl border border-ink/[0.08] bg-white p-6 shadow-[var(--shadow-float)] sm:p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <PlaceField
          id="bw-pickup"
          label="Pickup Location"
          icon={<Pin className={icon} />}
          placeholder="Bareilly, Delhi, Lucknow…"
          query={pickup.query}
          onQueryChange={(q) => setPickup({ query: q, place: null })}
          onPick={(p) => setPickup({ query: p.label, place: p })}
        />

        <PlaceField
          id="bw-drop"
          label="Destination"
          icon={<Route className={icon} />}
          placeholder="Nainital, Agra, Haridwar…"
          query={drop.query}
          onQueryChange={(q) => setDrop({ query: q, place: null })}
          onPick={(p) => setDrop({ query: p.label, place: p })}
        />

        {!compact && (
          <>
            <div>
              <label className={label} htmlFor="bw-date">
                <Calendar className={icon} /> Travel Date
              </label>
              <input
                id="bw-date"
                type="date"
                className={field}
                min={today}
                value={form.date}
                onChange={set("date")}
              />
            </div>
            <div>
              <label className={label} htmlFor="bw-time">
                <Clock className={icon} /> Pickup Time
              </label>
              <input
                id="bw-time"
                type="time"
                className={field}
                min={minTime}
                value={form.time}
                onChange={set("time")}
              />
              {isToday && (
                <p className="mt-1.5 text-[11px] text-ink-muted">
                  {earliestTimeToday()
                    ? `Earliest today: ${earliestTimeToday()}`
                    : "Too late for today — pick a later date."}
                </p>
              )}
            </div>
          </>
        )}

        <div>
          <label className={label} htmlFor="bw-trip">
            <Route className={icon} /> Trip Type
          </label>
          <select id="bw-trip" className={field} value={form.trip} onChange={set("trip")}>
            <option>One Way</option>
            <option>Round Trip</option>
            <option>Local / Hourly</option>
          </select>
        </div>

        <div>
          <label className={label} htmlFor="bw-cab">
            <Car className={icon} /> Vehicle Type
          </label>
          <select id="bw-cab" className={field} value={form.cab} onChange={set("cab")}>
            {/* Explicit value: the label carries the rate, but the form (and
                the WhatsApp message) should only ever hold the cab name. */}
            {premiumCabs.map((c) => (
              <option key={c.id} value={c.name}>
                {(form.trip === "Round Trip" ? c.rateRoundTrip : c.rateOneWay) === null
                  ? `${c.name} · ₹${c.rateRoundTrip}/km · ask for final price`
                  : `${c.name} · ₹${
                      form.trip === "Round Trip" ? c.rateRoundTrip : c.rateOneWay
                    }/km`}
              </option>
            ))}
          </select>
        </div>

        {!compact && (
          <div>
            <label
              className={`${label} ${needsReturn ? "" : "opacity-50"}`}
              htmlFor="bw-return"
            >
              <Calendar className={icon} /> Return Date
            </label>
            <input
              id="bw-return"
              type="date"
              // Only a round trip has a return leg — otherwise this is greyed
              // out and empty so it can't be filled in by mistake.
              disabled={!needsReturn}
              required={needsReturn}
              min={form.date || today}
              className={`${field} disabled:cursor-not-allowed disabled:bg-ink/[0.04] disabled:text-ink-muted/50`}
              value={form.returnDate}
              onChange={set("returnDate")}
              title={
                needsReturn ? undefined : "Switch to Round Trip to set a return date"
              }
            />
          </div>
        )}

        {/* Sits in the last cell of row 2, aligned with the inputs beside it. */}
        <div className="flex flex-col justify-end">
          <button onClick={submit} className="btn-taxi w-full !rounded-lg !py-3">
            <Search className="h-4 w-4" /> Search Ride
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-lg border border-ink/15 bg-taxi/15 px-4 py-3 text-sm text-ink">
          {error}{" "}
          <button
            onClick={sendOnWhatsApp}
            className="font-bold underline underline-offset-2 hover:text-ink-muted"
          >
            Or send this trip on WhatsApp instead →
          </button>
        </p>
      )}
    </div>
  );
}
