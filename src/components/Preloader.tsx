"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Shown once per browser session — a reload mid-visit shouldn't replay it. */
const SEEN_KEY = "YantraCabs:preloaded";

type Lenis = { start: () => void; stop: () => void };
const lenis = () => (window as unknown as { __lenis?: Lenis }).__lenis;

/**
 * Full-screen intro: a top-down YantraCabs taxi drives in, flashes its lights,
 * throws all four doors open, closes them, and the overlay fades out.
 *
 * Two things here are load-bearing:
 *
 * 1. Doors pivot via GSAP's `svgOrigin`, not CSS `transform-origin`. On an SVG
 *    child, CSS origin resolves against the element's own box unless you also
 *    set `transform-box`, and getting that subtly wrong makes a door swing
 *    inward — it looks like nothing happened. `svgOrigin` is stated in viewBox
 *    units and bakes the pivot into the matrix, so the hinge is exact.
 * 2. The overlay **unmounts** when it's done. Left in the DOM at opacity 0 it
 *    would still sit at z-9999 over every link and eat the first click of
 *    every navigation.
 */
export default function Preloader() {
  const [done, setDone] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const car = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(SEEN_KEY)) {
      setDone(true);
      return;
    }
    // NB: the "seen" flag is only written once the intro has actually finished
    // (see onComplete). Setting it here looked equivalent but broke the whole
    // thing in dev: StrictMode mounts, cleans up and re-mounts every effect, so
    // the first pass set the flag and the second pass read it back and skipped
    // straight to the site — you'd get a frame of the car with its doors shut
    // and nothing else, no matter what the animation did.

    const el = root.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Hold the page still while the overlay is up. Lenis may not exist yet
    // (its effect runs after this one), so guard both calls.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis()?.stop();

    /** Always runs, on every exit path — a stuck lock would freeze the site. */
    const release = () => {
      document.body.style.overflow = prevOverflow;
      lenis()?.start();
      ScrollTrigger.refresh();
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        // Held until the tab is actually on screen. A page opened in a
        // background tab gets its rAF throttled, and because SmoothScroll turns
        // GSAP's lag smoothing off, the whole timeline would otherwise be
        // fast-forwarded the moment you switch to it — you'd land on a car with
        // its doors already shut and never see them open.
        paused: true,
        onComplete: () => {
          sessionStorage.setItem(SEEN_KEY, "1");
          release();
          setDone(true);
        },
      });

      const doors = gsap.utils.toArray<SVGGElement>(".pl-door");

      if (reduced) {
        // Reduced motion still gets to see the four doors — just the single
        // move, with none of the rocking, push-in or drive-in around it.
        doors.forEach((door) => {
          tl.to(
            door,
            {
              rotation: Number(door.dataset.dir) * 88,
              svgOrigin: door.dataset.hinge,
              duration: 0.45,
              ease: "power2.out",
            },
            0.15
          );
        });
        tl.to(el, { opacity: 0, duration: 0.3, ease: "none" }, 1.1);
      } else {
        buildFullSequence(tl, doors);
      }

      // Start now if we're visible, otherwise wait until the tab is opened.
      if (document.visibilityState === "visible") {
        tl.play(0);
      } else {
        const onVisible = () => {
          if (document.visibilityState !== "visible") return;
          document.removeEventListener("visibilitychange", onVisible);
          tl.play(0);
        };
        document.addEventListener("visibilitychange", onVisible);
      }
    }, el);

    return () => {
      ctx.revert();
      release();
    };

    /** The full choreography, split out so the reduced path stays readable. */
    function buildFullSequence(
      tl: gsap.core.Timeline,
      doors: SVGGElement[]
    ) {

      tl
        // 1 — the car drives in from the left and settles.
        .from(car.current, {
          x: -140,
          rotation: -4,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
        })
        .from(
          ".pl-shadow",
          { scaleX: 0.4, opacity: 0, duration: 0.85, ease: "power3.out" },
          0
        )
        // 2 — headlights flash.
        .to(
          ".pl-lamp",
          { opacity: 1, duration: 0.14, repeat: 3, yoyo: true, ease: "none" },
          0.7
        );

      // 3 — the main event: each door swings almost fully open, one after the
      // next. A wide 0.22s gap between them is deliberate — the eye should
      // register four separate doors opening, not one blurred flurry.
      const OPEN_AT = 1;
      const GAP = 0.22;

      doors.forEach((door, i) => {
        const at = OPEN_AT + i * GAP;

        tl.to(
          door,
          {
            rotation: Number(door.dataset.dir) * 88,
            svgOrigin: door.dataset.hinge,
            duration: 0.95,
            ease: "back.out(1.8)",
          },
          at
        )
          // Each door leaves the frame with a little heft: the panel kicks
          // wider for a beat before settling back.
          .to(door, { scale: 1.05, duration: 0.2, ease: "power2.out" }, at)
          .to(door, { scale: 1, duration: 0.45, ease: "power2.inOut" }, at + 0.2)
          // …and the whole car rocks against it, so the swing has weight.
          .to(
            car.current,
            {
              rotation: Number(door.dataset.dir) * -0.9,
              duration: 0.14,
              ease: "power2.out",
            },
            at + 0.05
          )
          .to(
            car.current,
            { rotation: 0, duration: 0.4, ease: "elastic.out(1, 0.5)" },
            at + 0.19
          );
      });

      // Slow push-in across the whole door sequence — the camera leaning in.
      tl.to(
        car.current,
        { scale: 1.07, duration: 2.9, ease: "power1.inOut" },
        0.95
      );

      // 4 — all four held wide open, then shut in a quick ripple.
      doors.forEach((door, i) => {
        tl.to(
          door,
          {
            rotation: 0,
            svgOrigin: door.dataset.hinge,
            duration: 0.5,
            ease: "power3.inOut",
          },
          3.35 + i * 0.07
        );
      });

      tl
        // 5 — wordmark and progress line run underneath the door choreography.
        .from(
          ".pl-word",
          { y: 16, opacity: 0, duration: 0.6, ease: "power2.out" },
          1.8
        )
        .to(".pl-bar", { scaleX: 1, duration: 3.5, ease: "power1.inOut" }, 0.6)
        // 6 — yellow bloom as the doors seat, then out. Total runtime 4.55s.
        .to(
          ".pl-glow",
          { opacity: 1, scale: 1.18, duration: 0.5, ease: "power2.out" },
          3.7
        )
        .to(el, { opacity: 0, duration: 0.45, ease: "power2.inOut" }, 4.1);
    }
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      className="pl-root fixed inset-0 z-[9999] grid place-items-center overflow-hidden bg-ink"
      role="status"
      aria-label="Loading YantraCabs"
    >
      {/* Without JS the timeline never runs, so make sure the overlay can
          never trap a no-script visitor behind it. */}
      <noscript>
        <style>{`.pl-root{display:none !important}`}</style>
      </noscript>

      <div
        aria-hidden
        className="pl-glow pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(42% 38% at 50% 44%, rgba(255,206,0,0.20) 0%, rgba(255,206,0,0) 70%)",
        }}
      />

      <div className="relative flex flex-col items-center">
        <svg
          ref={car}
          className="pl-car h-[44vh] max-h-[360px] w-auto"
          viewBox="0 0 260 420"
          fill="none"
          aria-hidden
        >
          {/* Ground shadow */}
          <ellipse
            className="pl-shadow"
            cx="130"
            cy="392"
            rx="86"
            ry="13"
            fill="#000"
            opacity="0.5"
          />

          {/* Wheels — placed clear of the door arcs */}
          <g fill="#141414">
            <rect x="46" y="82" width="16" height="48" rx="8" />
            <rect x="198" y="82" width="16" height="48" rx="8" />
            <rect x="46" y="300" width="16" height="48" rx="8" />
            <rect x="198" y="300" width="16" height="48" rx="8" />
          </g>

          {/* Body */}
          <rect x="62" y="44" width="136" height="332" rx="46" fill="#FFCE00" />
          <rect
            x="62"
            y="44"
            width="136"
            height="332"
            rx="46"
            stroke="#0B0B0B"
            strokeWidth="4"
          />

          {/* Windscreen, cabin, rear glass */}
          <path
            d="M80 130c14-10 32-14 50-14s36 4 50 14l-6 22H86z"
            fill="#0B0B0B"
            opacity="0.9"
          />
          <rect x="80" y="158" width="100" height="136" rx="18" fill="#0B0B0B" opacity="0.9" />
          <path
            d="M86 300h88l6 22c-14 10-32 14-50 14s-36-4-50-14z"
            fill="#0B0B0B"
            opacity="0.9"
          />

          {/* Roof badge */}
          <rect x="104" y="212" width="52" height="26" rx="7" fill="#FFCE00" />
          <text
            x="130"
            y="231"
            textAnchor="middle"
            fontSize="19"
            fontWeight="700"
            fill="#0B0B0B"
            fontFamily="var(--font-anton), system-ui, sans-serif"
          >
            K
          </text>

          {/* Headlights */}
          <g className="pl-lamp" opacity="0.3">
            <rect x="78" y="50" width="30" height="12" rx="6" fill="#FFFDF2" />
            <rect x="152" y="50" width="30" height="12" rx="6" fill="#FFFDF2" />
          </g>

          {/* Doors last so they stay on top through the whole swing. Each is a
              <g> with its own hinge: data-hinge is the pivot in viewBox units,
              data-dir which way it opens. Front doors first in DOM order so the
              stagger runs front-to-back. Each carries a window inset so it
              still reads as a door while shut. */}
          <g stroke="#0B0B0B" strokeWidth="4" strokeLinejoin="round">
            <g className="pl-door" data-hinge="64 152" data-dir="1">
              <rect x="56" y="152" width="24" height="76" rx="8" fill="#FFCE00" />
              <rect x="61" y="162" width="14" height="46" rx="5" fill="#0B0B0B" opacity="0.85" stroke="none" />
            </g>
            <g className="pl-door" data-hinge="196 152" data-dir="-1">
              <rect x="180" y="152" width="24" height="76" rx="8" fill="#FFCE00" />
              <rect x="185" y="162" width="14" height="46" rx="5" fill="#0B0B0B" opacity="0.85" stroke="none" />
            </g>
            <g className="pl-door" data-hinge="64 234" data-dir="1">
              <rect x="56" y="234" width="24" height="68" rx="8" fill="#FFCE00" />
              <rect x="61" y="243" width="14" height="40" rx="5" fill="#0B0B0B" opacity="0.85" stroke="none" />
            </g>
            <g className="pl-door" data-hinge="196 234" data-dir="-1">
              <rect x="180" y="234" width="24" height="68" rx="8" fill="#FFCE00" />
              <rect x="185" y="243" width="14" height="40" rx="5" fill="#0B0B0B" opacity="0.85" stroke="none" />
            </g>
          </g>
        </svg>

        <div className="pl-word mt-7 text-center">
          <div className="display text-3xl text-white sm:text-4xl">
            Kobo<span className="hi">Cabs</span>
          </div>
          <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.3em] text-white/45">
            Premium Cab Booking
          </div>
        </div>

        <div className="mt-6 h-[3px] w-44 overflow-hidden rounded-full bg-white/12">
          <div
            className="pl-bar h-full w-full origin-left rounded-full bg-taxi"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  );
}

