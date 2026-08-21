"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { getRoute, type Place, type RouteResult } from "@/lib/geo";
import { quoteFares } from "@/lib/fare";
import { fareNote } from "@/data/site";
import { Arrow, Pin, Route, Calendar, Clock, Users, Chat } from "@/components/Icons";
import BookLink from "@/components/BookLink";
import BookingDialog, { type BookingDraft } from "@/components/BookingDialog";

type LiveRate = {
  id: string;
  name: string;
  rateOneWay: number;
  rateRoundTrip: number;
  seats: number;
};

// Leaflet touches `window`, so the map can only load in the browser.
const QuoteMap = dynamic(() => import("@/components/QuoteMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[320px] animate-pulse rounded-2xl border border-ink/[0.08] bg-ink/5 sm:h-[440px]" />
  ),
});

export default function QuoteView() {
  const params = useSearchParams();

  const from = useMemo<Place | null>(() => {
    const label = params.get("from");
    const lat = parseFloat(params.get("fromLat") ?? "");
    const lon = parseFloat(params.get("fromLon") ?? "");
    return label && !isNaN(lat) && !isNaN(lon) ? { label, lat, lon } : null;
  }, [params]);

  const to = useMemo<Place | null>(() => {
    const label = params.get("to");
    const lat = parseFloat(params.get("toLat") ?? "");
    const lon = parseFloat(params.get("toLon") ?? "");
    return label && !isNaN(lat) && !isNaN(lon) ? { label, lat, lon } : null;
  }, [params]);

  const date = params.get("date") ?? "";
  const time = params.get("time") ?? "";
  const trip = params.get("trip") ?? "One Way";

  const [route, setRoute] = useState<RouteResult | null>(null);
  const [rates, setRates] = useState<LiveRate[]>([]);
  const [draft, setDraft] = useState<BookingDraft | null>(null);
  const scope = useRef<HTMLElement>(null);

  // Live rates so an admin rate change shows up here without a redeploy.
  // On any failure quoteFares falls back to the static list in site.ts.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/vehicles")
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled && Array.isArray(d.vehicles)) setRates(d.vehicles);
      })
      .catch(() => {
        /* static fallback is fine */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Summary → map → fare cards, in that order, once the route resolves.
  // fromTo with an explicit end state means an interrupted run can never
  // leave the bill invisible.
  useEffect(() => {
    if (!route || !scope.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out", opacity: 1 } })
        .fromTo(".q-summary", { y: 18, opacity: 0 }, { y: 0, duration: 0.6 })
        .fromTo(".q-map", { y: 22, opacity: 0 }, { y: 0, duration: 0.7 }, "-=0.35")
        .fromTo(
          ".q-fare",
          { y: 24, opacity: 0 },
          { y: 0, duration: 0.6, stagger: 0.09 },
          "-=0.3"
        );
    }, scope);
    return () => ctx.revert();
  }, [route]);

  useEffect(() => {
    if (!from || !to) return;
    let cancelled = false;
    setRoute(null);
    getRoute(from, to).then((r) => {
      if (!cancelled) setRoute(r);
    });
    return () => {
      cancelled = true;
    };
  }, [from, to]);

  if (!from || !to) {
    return (
      <section className="wrap py-24 text-center">
        <h1 className="display text-4xl sm:text-5xl">
          No Trip <span className="hi">Selected</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ink-muted">
          Start from the booking form so we can work out your distance and fare.
        </p>
        <BookLink className="btn-taxi mt-8">
          Book A Ride <Arrow className="h-4 w-4" />
        </BookLink>
      </section>
    );
  }

  const fares = route ? quoteFares(route.distanceKm, trip, rates) : [];

  return (
    <section ref={scope} className="wrap py-16 sm:py-20">
      <span className="eyebrow">Fare Estimate</span>
      <h1 className="display t-display mt-3">
        Your Trip <span className="hi">Quote</span>
      </h1>

      {/* Trip summary */}
      <div className="q-summary card mt-8 p-6 sm:p-7">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="chip-taxi mt-0.5 h-8 w-8 shrink-0 rounded-full">
                <Pin className="h-3.5 w-3.5" />
              </span>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-ink-muted">
                  Pickup
                </div>
                <div className="text-sm font-semibold leading-snug">{from.label}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink">
                <Route className="h-3.5 w-3.5 text-taxi" />
              </span>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-ink-muted">
                  Drop
                </div>
                <div className="text-sm font-semibold leading-snug">{to.label}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Fact icon={<Calendar className="h-3.5 w-3.5 text-taxi" />} label="Date" value={date || "—"} />
            <Fact icon={<Clock className="h-3.5 w-3.5 text-taxi" />} label="Time" value={time || "—"} />
            <Fact icon={<Route className="h-3.5 w-3.5 text-taxi" />} label="Trip" value={trip} />
            <Fact
              icon={<Arrow className="h-3.5 w-3.5 text-taxi" />}
              label="Distance"
              value={route ? `${route.distanceKm} km` : "…"}
              sub={route ? route.durationText : undefined}
            />
          </div>
        </div>

        {route?.approximate && (
          <p className="mt-5 rounded-lg border border-ink/15 bg-taxi/15 px-4 py-2.5 text-xs font-medium text-ink">
            Live routing was unavailable, so this distance is an approximate
            straight-line estimate. We&apos;ll confirm the exact fare on WhatsApp.
          </p>
        )}
      </div>

      {/* Map */}
      <div className="q-map mt-8">
        {route ? (
          <QuoteMap from={from} to={to} coordinates={route.coordinates} />
        ) : (
          <div className="grid h-[320px] place-items-center rounded-2xl border border-ink/[0.08] bg-ink/5 sm:h-[440px]">
            <div className="text-center">
              <span className="mx-auto block h-8 w-8 animate-spin rounded-full border-[3px] border-ink/20 border-t-ink" />
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-ink-muted">
                Calculating your route…
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Fares */}
      <h2 className="display t-h2 mt-16">
        Choose Your <span className="hi">Cab</span>
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
        {fareNote.long} State entry permits are paid at the booth.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {!route
          ? [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-2xl border border-ink/[0.08] bg-ink/5"
              />
            ))
          : fares.map((v) => (
              <article
                key={v.id}
                className="q-fare card card-hover group relative flex flex-col overflow-hidden p-6"
              >
                {/* Yellow accent that draws across the top on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 w-0 bg-taxi transition-all duration-500 ease-out group-hover:w-full"
                />

                <div className="flex items-start justify-between gap-3">
                  <h3 className="card-title">{v.name}</h3>
                  <span className="shrink-0 rounded-full bg-taxi px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-ink">
                    {v.appliedRate === null ? "On request" : `₹${v.appliedRate}/km`}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-3 text-xs font-semibold text-ink-muted">
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" /> {v.seats} seats
                  </span>
                  <span className="border-l border-ink/15 pl-3">AC</span>
                </div>

                <div className="mt-6 border-t border-ink/[0.08] pt-5">
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-muted">
                    Estimated total
                  </div>
                  <div className="num-taxi mt-2.5 text-[2.35rem]">
                    {v.fare === null ? "Call us" : `₹${v.fare.toLocaleString("en-IN")}`}
                  </div>
                  <div className="mt-2 text-[11px] text-ink-muted">
                    {v.fare === null
                      ? v.id === "tempo"
                        ? "Ask for final price"
                        : "Rate quoted on request"
                      : `Estimate · ${route.distanceKm} km · toll & driver extra`}
                  </div>
                </div>

                {/* Own row with real breathing room above it */}
                <div className="mt-auto pt-7">
                  <button
                    onClick={() =>
                      setDraft({
                        from,
                        to,
                        date,
                        time,
                        tripType: trip,
                        vehicleSlug: v.id,
                        vehicleName: v.name,
                        estimatedFare: v.fare,
                        estimatedKm: route.distanceKm,
                      })
                    }
                    className="btn-taxi w-full !rounded-xl !py-3.5 text-xs"
                  >
                    <Chat className="h-4 w-4" />
                    {v.id === "tempo" ? "Ask for final price" : v.fare === null ? "Get a Quote" : "Book Now"}
                  </button>
                </div>
              </article>
            ))}
      </div>

      <Link
        href="/#book"
        className="mt-10 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-ink hover:gap-2"
      >
        ← Change trip details
      </Link>

      {draft && <BookingDialog draft={draft} onClose={() => setDraft(null)} />}
    </section>
  );
}

function Fact({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-ink/[0.08] bg-paper/80 px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-ink-muted">
        {icon} {label}
      </div>
      <div className="mt-1 text-sm font-bold leading-tight">{value}</div>
      {sub && <div className="text-[11px] text-ink-muted">{sub}</div>}
    </div>
  );
}
