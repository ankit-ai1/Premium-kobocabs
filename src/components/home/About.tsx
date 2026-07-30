"use client";

import Image from "next/image";
import Link from "next/link";
import { img, site } from "@/data/site";
import { Check, Arrow } from "@/components/Icons";
import { useReveal, useImageReveal, useParallax } from "@/hooks/useGsap";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const points = [
  "Zero hidden charges — toll, GST & allowance included",
  "Driver dispatched 30 minutes before every pickup",
  "Clean, sanitised and inspected before each trip",
];

export default function About() {
  const ref = useReveal<HTMLDivElement>("[data-reveal]", { stagger: 0.1, y: 44 });
  // Separate scopes so each hook owns its own root element.
  const imgScope = useImageReveal<HTMLElement>();
  const parallax = useParallax<HTMLDivElement>(".about-img", 40);
  const badge = useRef<HTMLDivElement>(null);

  // The badge lands a beat after the image, with a small overshoot.
  useEffect(() => {
    const el = badge.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const a = gsap.fromTo(
        el,
        { scale: 0.7, rotate: -6, opacity: 0 },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          immediateRender: false,
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        }
      );
      return () => {
        a.scrollTrigger?.kill();
        a.kill();
      };
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={imgScope} className="wrap scroll-mt-28 py-24" id="about">
      <div ref={ref} className="grid items-center gap-14 lg:grid-cols-2">
        {/* image with offset yellow frame */}
        <div data-reveal className="relative">
          {/* Soft yellow glow instead of a hard offset frame */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-8 -top-8 h-2/3 w-2/3 rounded-full opacity-70 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(255,206,0,0.45) 0%, rgba(255,206,0,0) 70%)",
            }}
          />
          <div
            ref={parallax}
            data-img-reveal
            className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-ink/5 shadow-[0_18px_50px_-18px_rgba(11,11,11,0.35)]"
          >
            {/* Oversized so the parallax drift never exposes an edge. */}
            <div className="about-img absolute -inset-y-[8%] inset-x-0">
              <Image
                src={img.about}
                alt="A KoboCabs Mahindra Scorpio N on a highway at sunset"
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
          <div
            ref={badge}
            className="absolute -bottom-5 right-4 rounded-2xl bg-taxi px-5 py-3 shadow-[0_12px_30px_-8px_rgba(11,11,11,0.4)]"
          >
            <div className="font-display text-3xl leading-none">Since {site.since}</div>
            <div className="mt-1 text-[11px] font-bold uppercase tracking-widest text-ink/70">
              Trusted in {site.city}
            </div>
          </div>
        </div>

        {/* copy */}
        <div>
          <span data-reveal className="eyebrow">About KoboCabs</span>
          <h2 data-reveal className="display t-h2 mt-3">
            More Than A Ride — A <span className="hi">Promise</span>
          </h2>
          <p data-reveal className="mt-5 leading-relaxed text-ink-muted">
            From a single cab in {site.city} to {site.stats.routes} routes across
            North India, KoboCabs has grown on one idea: treat every passenger like
            family. Honest fares, punctual drivers, and a phone that always answers.
          </p>

          <ul data-reveal className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm font-semibold">
                <span className="chip-taxi mt-0.5 h-5 w-5 shrink-0 rounded-md">
                  <Check className="h-3.5 w-3.5 text-ink" />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-8 flex flex-wrap items-center gap-6">
            <Link href="/how-it-works" className="btn-ink !rounded-full">
              How It Works <Arrow className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
