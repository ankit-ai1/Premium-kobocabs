"use client";

import Link from "next/link";
import { site } from "@/data/site";
import { Arrow, Chat } from "@/components/Icons";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReveal } from "@/hooks/useGsap";
import BookLink from "@/components/BookLink";

export default function CtaBand() {
  const ref = useReveal<HTMLDivElement>("[data-reveal]", { stagger: 0.09, y: 34 });
  const glow = useRef<HTMLDivElement>(null);

  // Slow ambient drift on the bloom so the black card feels alive, not static.
  useEffect(() => {
    const el = glow.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        xPercent: 8,
        yPercent: 6,
        scale: 1.12,
        duration: 11,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  // No top border here — the paper/ink colour change is the only divider needed.
  return (
    <section className="bg-paper py-20">
      <div ref={ref} className="wrap">
        <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-20 text-center text-white shadow-[0_30px_80px_-24px_rgba(11,11,11,0.55)]">
          {/* Warm bloom behind the copy so the black card isn't flat */}
          <div
            ref={glow}
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(60% 70% at 50% 0%, rgba(255,206,0,0.18) 0%, rgba(255,206,0,0) 65%)",
            }}
          />
          <span data-reveal className="eyebrow relative text-white/70">
            Ready When You Are
          </span>
          {/* Masked so the heading is uncovered from below rather than fading. */}
          <h2 className="display t-display relative mx-auto mt-4 max-w-4xl overflow-hidden pb-[0.06em] text-white">
            <span data-reveal className="block">
              Book Your Next Ride In <span className="hi">Under A Minute</span>
            </span>
          </h2>
          <p data-reveal className="relative mx-auto mt-5 max-w-xl text-white/65">
            Fixed fares, verified drivers, zero advance. Call us, WhatsApp us, or
            fill the form — a real person replies within two hours.
          </p>

          <div data-reveal className="relative mt-9 flex flex-wrap justify-center gap-4">
            <BookLink className="btn-taxi">
              Book Your Cab Now <Arrow className="h-4 w-4" />
            </BookLink>
            <a href={site.whatsapp} target="_blank" rel="noreferrer" className="btn inline-flex border border-white/30 text-white hover:bg-white hover:text-ink">
              <Chat className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
