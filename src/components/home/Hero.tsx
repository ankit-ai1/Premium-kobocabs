"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { img, site } from "@/data/site";
import { Arrow, Star, Phone } from "@/components/Icons";
import { useMagnetic } from "@/hooks/useGsap";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const magnet = useMagnetic<HTMLAnchorElement>(0.22, 80);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      // fromTo, not from: the end state is stated explicitly, so a re-mount
      // (React StrictMode / Fast Refresh) can never capture a mid-animation
      // opacity as the "natural" value and leave the element invisible.
      gsap
        .timeline({ defaults: { ease: "expo.out", opacity: 1 } })
        .fromTo(".h-eyebrow", { y: 20, opacity: 0 }, { y: 0, duration: 0.7 })
        // Each line sits in an overflow-hidden mask, so sliding it up from
        // below reads as the type being uncovered rather than fading in.
        .fromTo(
          ".h-line",
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, duration: 1.1, stagger: 0.12 },
          "-=0.35"
        )
        .fromTo(".h-sub", { y: 24, opacity: 0 }, { y: 0, duration: 0.7 }, "-=0.6")
        .fromTo(".h-cta", { y: 20, opacity: 0 }, { y: 0, duration: 0.6, stagger: 0.1 }, "-=0.45");

      // Content drifts up and fades as the hero leaves — adds depth against
      // the slower background.
      gsap.to(".h-content", {
        yPercent: -12,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Slow ambient zoom.
      gsap.to(".h-bg", {
        scale: 1.14,
        duration: 18,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });

      // Background drifts slower than the page for depth. The layer is 120%
      // tall (see -inset-y) so the drift never exposes an edge.
      gsap.fromTo(
        ".h-bg-layer",
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden bg-ink">
      {/* Background image — oversized so the parallax drift never shows an edge */}
      <div className="absolute inset-0 overflow-hidden bg-ink">
        <div className="h-bg-layer absolute -inset-y-[10%] inset-x-0">
          <Image
            src={img.mountains}
            alt="Scenic North India mountain road"
            fill
            priority
            sizes="100vw"
            className="h-bg object-cover"
          />
        </div>
        {/* Layered cinematic grade: dark on the copy side, warm at the horizon */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/50" />
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(70% 55% at 18% 55%, rgba(255,206,0,0.16) 0%, rgba(255,206,0,0) 60%)",
          }}
        />
      </div>

      {/* Content */}
      {/* Fills the viewport below the 70px navbar so the whole hero is visible
          on landing. svh (smallest viewport) keeps it fully in frame on mobile
          where browser chrome eats into 100vh; vh stays as the fallback. */}
      <div className="h-content wrap relative z-10 flex min-h-[calc(100vh-70px)] flex-col justify-center py-16 supports-[height:100svh]:min-h-[calc(100svh-70px)]">
        <div className="h-eyebrow inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur">
          <span className="flex gap-0.5 text-taxi">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3" />
            ))}
          </span>
          {site.stats.rating} · {site.stats.rides} happy riders
        </div>

        {/* Each line gets its own mask so .h-line can slide up from beneath it.
            The small pad keeps the yellow text-shadow from being clipped. */}
        <h1 className="display t-hero mt-7 max-w-5xl text-white">
          <span className="block overflow-hidden pb-[0.06em]">
            <span className="h-line block">Your Journey,</span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span className="h-line block">
              Our <span className="hi">Yellow Wheels</span>
            </span>
          </span>
        </h1>

        <p className="h-sub mt-7 max-w-lg text-lg leading-relaxed text-white/75">
          Outstation and city rides across North India — clean cabs, verified
          drivers, and one honest fare. No advance, no surprises.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link ref={magnet} href="/#book" className="h-cta btn-taxi !rounded-full">
            Book Your Ride <Arrow className="h-4 w-4" />
          </Link>
          <a
            href={`tel:${site.phoneRaw}`}
            className="h-cta inline-flex items-center gap-3 text-white"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full border border-white/30 backdrop-blur">
              <Phone className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-[11px] uppercase tracking-widest text-white/60">
                Call anytime
              </span>
              <span className="font-bold">{site.phone}</span>
            </span>
          </a>
        </div>

      </div>
    </section>
  );
}
