"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { img } from "@/data/site";
import { SectionHead } from "@/components/Bits";
import { Route, Arrow, Snow, Users, Pin } from "@/components/Icons";
import { useReveal } from "@/hooks/useGsap";

const services = [
  {
    Icon: Route,
    title: "Outstation Cabs",
    text: "Intercity rides between every major city of North India.",
    image:
      "https://res.cloudinary.com/dtg3lepr4/image/upload/v1786517714/ChatGPT_Image_Aug_12_2026_12_24_58_PM_se6jlg.png",
  },
  {
    Icon: Pin,
    title: "One-Way Drops",
    text: "Pay only for the distance you travel — no return fare.",
    image:
      "https://res.cloudinary.com/dtg3lepr4/image/upload/v1786517888/ChatGPT_Image_Aug_12_2026_12_27_46_PM_ajyhov.png",
  },
  {
    Icon: Snow,
    title: "Hill Station Trips",
    text: "Expert mountain drives to Nainital, Mussoorie & Dehradun.",
    image:
      "https://res.cloudinary.com/dtg3lepr4/image/upload/v1786517955/ChatGPT_Image_Aug_12_2026_12_28_58_PM_zq7uys.png",
  },
  {
    Icon: Users,
    title: "Pilgrimage Routes",
    text: "Haridwar, Vrindavan & Vaishno Devi, made comfortable.",
    image:
      "https://res.cloudinary.com/dtg3lepr4/image/upload/v1786518634/ChatGPT_Image_Aug_12_2026_12_40_17_PM_w9aqpu.png",
  },
];

export default function Services() {
  const ref = useReveal<HTMLDivElement>("[data-reveal]", { stagger: 0.08, y: 50, scale: 0.96 });
  const chips = useRef<HTMLDivElement>(null);

  // Icon chips pop in just after their card has settled.
  useEffect(() => {
    const el = chips.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const a = gsap.fromTo(
        "[data-chip]",
        { scale: 0.4, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(2)",
          stagger: 0.08,
          delay: 0.25,
          immediateRender: false,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
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
    <section className="wrap py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead
          eyebrow="What We Offer"
          title="Rides For Every"
          hi="Reason"
          sub="Whatever the trip, there's a YantraCabs service tuned for it."
        />
        <Link href="/premium-cabs" className="btn-outline hidden !rounded-full sm:inline-flex">
          All Services <Arrow className="h-4 w-4" />
        </Link>
      </div>

      <div ref={chips}>
      <div ref={ref} className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(({ Icon, title, text, image }) => (
          <article
            key={title}
            data-reveal
            className="card card-hover group flex flex-col overflow-hidden"
          >
            <div className="relative">
              <div className="relative aspect-[16/11] overflow-hidden bg-ink/5">
                <Image
                  src={image}
                  alt={`${title} with YantraCabs`}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink/45 to-transparent" />
              </div>
              {/* overlapping icon chip */}
              <span
                data-chip
                className="chip-taxi absolute -bottom-5 left-6 h-11 w-11 rounded-xl shadow-[0_8px_20px_-6px_rgba(11,11,11,0.4)] transition-transform duration-300 ease-out group-hover:scale-110"
              >
                <Icon className="h-5 w-5" />
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6 pt-9">
              <h3 className="card-title">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{text}</p>
              <Link
                href="/premium-cabs"
                className="nudge mt-4 inline-flex items-center gap-1.5 py-1.5 text-xs font-bold uppercase tracking-widest text-ink"
              >
                Read More <Arrow className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
      </div>
    </section>
  );
}

