"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { site } from "@/data/site";
import { Arrow, Pin, Phone, Plus, Whatsapp } from "@/components/Icons";
import RouteBookLink from "@/components/RouteBookLink";
import { useReveal } from "@/hooks/useGsap";

// The posters are 4:5 social-media creatives with their own type baked in, so
// they're shown whole (never cropped) and the fares are repeated as real text
// beside them for search engines and screen readers.
const posters = [
  {
    src: "https://res.cloudinary.com/dtg3lepr4/image/upload/f_auto,q_auto/v1791216861/file_000000007f6881fb83bb0ded4a72aa19_x6v4me.png",
    alt: "YantraCabs religious yatra fares: Delhi to Khatu Dham from ₹4000, Delhi to Kainchi Dham from ₹4500, Bareilly to Kainchi Dham from ₹3500",
  },
  {
    src: "https://res.cloudinary.com/dtg3lepr4/image/upload/f_auto,q_auto/v1791216820/file_00000000d34c8206b2409efe18b60e1c_uailgf.png",
    alt: "YantraCabs Delhi to Kainchi Dham and Delhi to Khatu Shyam cabs",
  },
];

const yatras = [
  { route: "Delhi to Khatu Shyam Ji", fare: "4,000" },
  { route: "Delhi to Kainchi Dham", fare: "4,500" },
  { route: "Bareilly to Kainchi Dham", fare: "3,500" },
];

export default function YatraOffers() {
  const ref = useReveal<HTMLDivElement>("[data-reveal]", { stagger: 0.1, y: 44 });
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) => (i === null ? i : (i + dir + posters.length) % posters.length)),
    []
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  return (
    <section className="relative overflow-hidden border-b border-ink/[0.08] bg-paper py-20 sm:py-24">
      {/* Soft yellow blooms behind the posters. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[560px] w-[560px] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,206,0,0.32) 0%, rgba(255,206,0,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,206,0,0.22) 0%, rgba(255,206,0,0) 70%)",
        }}
      />

      <div
        ref={ref}
        className="wrap relative grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
      >
        {/* copy + fares */}
        <div>
          <span
            data-reveal
            className="inline-flex items-center gap-2 rounded-full bg-ink px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-taxi"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-taxi opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-taxi" />
            </span>
            Yatra Specials
          </span>

          <h2 data-reveal className="display t-h2 mt-5 text-ink">
            Religious Yatra, <span className="hi">Now Easier</span>
          </h2>
          <p data-reveal className="mt-4 max-w-md text-[0.975rem] leading-relaxed text-ink-muted">
            Darshan at Khatu Shyam Ji and Kainchi Dham with a clean cab, a
            verified driver and one fixed fare, settled before you leave.
          </p>

          <ul data-reveal className="mt-8 space-y-3">
            {yatras.map(({ route, fare }) => {
              const [from, to] = route.split(/\s+to\s+/i);
              return (
                <li key={route}>
                  <RouteBookLink
                    route={route}
                    className="card card-hover group flex items-center gap-4 p-4 pr-5"
                  >
                    <span className="chip-taxi h-11 w-11 shrink-0">
                      <Pin className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-bold uppercase tracking-widest text-ink-muted">
                        From {from}
                      </span>
                      <span className="block truncate text-base font-bold text-ink sm:text-lg">
                        {to}
                      </span>
                    </span>
                    <span className="text-right">
                      <span className="block text-[10px] font-bold uppercase tracking-widest text-ink-muted">
                        Starting
                      </span>
                      <span className="font-display text-2xl tracking-wide text-ink">
                        ₹{fare}
                      </span>
                    </span>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-taxi transition-transform duration-300 group-hover:translate-x-1">
                      <Arrow className="h-4 w-4" />
                    </span>
                  </RouteBookLink>
                </li>
              );
            })}
          </ul>

          <div data-reveal className="mt-8 flex flex-wrap gap-3">
            <a href={`tel:${site.phoneRaw}`} className="btn-ink !rounded-full">
              <Phone className="h-4 w-4" /> {site.phone}
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn-outline !rounded-full"
            >
              <Whatsapp className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>
        </div>

        {/* posters: swipe row on mobile, staggered fan on desktop */}
        <div data-reveal className="relative">
          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:items-start sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
            {posters.map((p, i) => (
              <button
                key={p.src}
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`View poster ${i + 1} full size`}
                className={`group relative w-[78%] shrink-0 snap-center rounded-[1.75rem] border border-ink/10 bg-white p-2 text-left shadow-[0_24px_60px_-24px_rgba(11,11,11,0.45)] transition-all duration-500 ease-out hover:z-10 hover:-translate-y-2 hover:rotate-0 hover:shadow-[0_36px_80px_-28px_rgba(11,11,11,0.55)] sm:w-auto ${
                  i === 0 ? "sm:-rotate-2" : "sm:mt-16 sm:rotate-2"
                }`}
              >
                <span className="relative block aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-ink/5">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width:640px) 78vw, (max-width:1024px) 45vw, 28vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  {/* zoom hint — hover only, so it never sits on the poster's own text */}
                  <span className="absolute inset-0 hidden place-items-center bg-ink/0 transition-colors duration-300 group-hover:bg-ink/35 sm:grid">
                    <span className="inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-taxi px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-ink opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <Plus className="h-3.5 w-3.5" /> View Full
                    </span>
                  </span>
                </span>
              </button>
            ))}
          </div>
          <p className="mt-1 text-center text-[11px] font-semibold uppercase tracking-widest text-ink-muted sm:hidden">
            Tap to enlarge · Swipe for more →
          </p>
        </div>
      </div>

      {/* lightbox */}
      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Yatra poster"
          data-lenis-prevent
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm animate-[fadeIn_.2s_ease-out]"
        >
          <div
            className="relative h-[min(88vh,calc((100vw-2rem)*1.25))] aspect-[4/5]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={posters[open].src}
              alt={posters[open].alt}
              fill
              sizes="(max-width:768px) 100vw, 70vh"
              className="rounded-2xl object-contain shadow-2xl"
              priority
            />
          </div>

          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-taxi hover:text-ink"
          >
            <Plus className="h-5 w-5 rotate-45" />
          </button>
          {posters.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous poster"
                className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-taxi hover:text-ink sm:left-6"
              >
                <Arrow className="h-5 w-5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Next poster"
                className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-taxi hover:text-ink sm:right-6"
              >
                <Arrow className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
}
