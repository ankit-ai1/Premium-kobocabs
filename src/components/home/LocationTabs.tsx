"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { img } from "@/data/site";
import { SectionHead } from "@/components/Bits";
import { Check, Arrow } from "@/components/Icons";

const cities: Record<
  string,
  { blurb: string; image: string; points: string[] }
> = {
  Bareilly: {
    blurb: "Our home base. Same-day outstation cabs to the hills, Delhi and every corner of UP.",
    image: img.bareilly,
    points: ["Airport & railway pickups", "Hourly local rentals", "Fixed one-way drops"],
  },
  Nainital: {
    blurb: "Beat the traffic to the Queen of Hills with drivers who know every mountain bend.",
    image:
      "https://res.cloudinary.com/dtg3lepr4/image/upload/v1785423958/ChatGPT_Image_Jul_30_2026_08_35_28_PM_zt5ixb.png",
    points: ["Experienced hill drivers", "Sightseeing packages", "Door-to-door service"],
  },
  Delhi: {
    blurb: "Reliable intercity rides in and out of the capital, day or night.",
    image:
      "https://res.cloudinary.com/dtg3lepr4/image/upload/v1785424212/ChatGPT_Image_Jul_30_2026_08_39_58_PM_g1jrni.png",
    points: ["Airport transfers", "Corporate travel", "Round-trip fares"],
  },
  Haridwar: {
    blurb: "Comfortable pilgrimage journeys along the Ganga, planned around your rituals.",
    image:
      "https://res.cloudinary.com/dtg3lepr4/image/upload/v1785424434/ChatGPT_Image_Jul_30_2026_08_43_42_PM_zvfq20.png",
    points: ["Early morning pickups", "Multi-day plans", "Patient drivers"],
  },
  Agra: {
    blurb: "The Taj in three hours flat via the Yamuna Expressway — clean, quick, calm.",
    image:
      "https://res.cloudinary.com/dtg3lepr4/image/upload/v1785424703/ChatGPT_Image_Jul_30_2026_08_48_06_PM_hdgbl7.png",
    points: ["Same-day return", "Monument tours", "Flexible timings"],
  },
  Lucknow: {
    blurb: "City rides and outstation trips across the Nawabi capital and beyond.",
    image:
      "https://res.cloudinary.com/dtg3lepr4/image/upload/v1785424971/ChatGPT_Image_Jul_30_2026_08_52_04_PM_qfw8vi.png",
    points: ["Wedding cabs", "Business travel", "Local sightseeing"],
  },
};

export default function LocationTabs() {
  const names = Object.keys(cities);
  const [active, setActive] = useState(names[0]);
  const c = cities[active];
  const panel = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  // Short cross-fade on tab change: image fades, copy slides in slightly.
  // Skipped on first paint so the panel isn't animated into view on load.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = panel.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".lt-img",
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      );
      gsap.fromTo(
        ".lt-copy > *",
        { opacity: 0, x: 18 },
        { opacity: 1, x: 0, duration: 0.45, ease: "power3.out", stagger: 0.05 }
      );
    }, el);
    return () => ctx.revert();
  }, [active]);

  // Borders on both edges: white About above, white Services below, so this
  // paper band needs its own dividers to read as a distinct section.
  return (
    <section className="border-y border-ink/[0.08] bg-paper py-24">
      <div className="wrap">
        <SectionHead
          center
          eyebrow="Where We Drive"
          title="Cabs Across"
          hi="North India"
          sub="Pick a city to see how KoboCabs gets you there."
        />

        {/* tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {names.map((n) => (
            <button
              key={n}
              onClick={() => setActive(n)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition-all duration-300 ease-out ${
                active === n
                  ? "bg-taxi text-ink shadow-[0_8px_20px_-6px_rgba(11,11,11,0.35)]"
                  : "border border-ink/10 bg-white text-ink-muted hover:-translate-y-0.5 hover:border-taxi/50 hover:text-ink"
              }`}
            >
              {n}
            </button>
          ))}
        </div>

        {/* panel */}
        <div
          ref={panel}
          className="card mt-10 grid items-center gap-10 p-6 lg:grid-cols-2 lg:p-8"
        >
          <div className="relative aspect-[16/11] overflow-hidden rounded-xl bg-ink/5">
            <Image
              key={c.image}
              src={c.image}
              alt={`KoboCabs rides in ${active}`}
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="lt-img object-cover"
            />
          </div>
          <div className="lt-copy">
            <h3 className="display t-h3">
              Rides In <span className="hi">{active}</span>
            </h3>
            <p className="mt-4 leading-relaxed text-ink-muted">{c.blurb}</p>
            <ul className="mt-5 space-y-2.5">
              {c.points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm font-semibold">
                  <span className="chip-taxi h-5 w-5 rounded-md">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <Link href="/routes" className="btn-ink mt-7 !rounded-full">
              See {active} Routes <Arrow className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
