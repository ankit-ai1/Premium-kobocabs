"use client";

import Image from "next/image";
import Link from "next/link";
import { premiumCabs } from "@/data/site";
import { SectionHead } from "@/components/Bits";
import { Users, Arrow } from "@/components/Icons";
import { useReveal } from "@/hooks/useGsap";
import CabBookLink from "@/components/CabBookLink";

export default function PremiumCabsPreview() {
  const ref = useReveal<HTMLDivElement>("[data-reveal]", { stagger: 0.08, y: 50, scale: 0.96 });

  return (
    <section id="premium-cabs" className="wrap scroll-mt-28 py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead
          eyebrow="Our Premium Cabs"
          title="Premium Cabs"
          hi="For Every Trip"
          sub="Transparent per-kilometre pricing. Every cab is air-conditioned, GPS-tracked, and driven by a verified chauffeur."
        />
        <Link href="/premium-cabs" className="btn-outline hidden !rounded-full sm:inline-flex">
          All Cabs <Arrow className="h-4 w-4" />
        </Link>
      </div>

      <div ref={ref} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {premiumCabs.map((c) => (
          <article
            key={c.id}
            data-reveal
            className="card card-hover group flex flex-col overflow-hidden"
          >
            <div className="relative aspect-[16/11] overflow-hidden bg-ink/5">
              <Image
                src={c.image}
                alt={`KoboCabs ${c.name} — ${c.seats} seats, air-conditioned`}
                fill
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink/45 to-transparent" />
              <span className="absolute left-3 top-3 rounded-full bg-taxi px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-ink shadow-[0_4px_12px_-2px_rgba(11,11,11,0.35)]">
                {c.tag}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="card-title">{c.name}</h3>
                <span className="num-taxi shrink-0 text-2xl">
                  ₹{c.ratePerKm}
                  <span className="text-sm text-ink [text-shadow:none]">/km</span>
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{c.blurb}</p>

              <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-ink-muted">
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" /> {c.seats} seats
                </span>
                <span className="border-l border-ink/15 pl-4">AC</span>
              </div>

              <div className="mt-auto pt-5">
                <CabBookLink cab={c.name} className="btn-ink w-full !py-3.5 text-xs">
                  Book {c.name} <Arrow className="h-3.5 w-3.5" />
                </CabBookLink>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
