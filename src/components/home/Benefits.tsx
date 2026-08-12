"use client";

import Image from "next/image";
import { img } from "@/data/site";
import { SectionHead } from "@/components/Bits";
import { useReveal } from "@/hooks/useGsap";

const benefits = [
  ["01", "Always On Time", "Driver dispatched 30 minutes before pickup — every time."],
  ["02", "Professional Drivers", "Background-verified chauffeurs holding valid commercial licences."],
  ["03", "Transparent Billing", "Full fare breakdown before you confirm. Toll, GST and allowance included."],
  ["04", "Just 15% To Confirm", "Lock your booking with a small advance. Pay the balance at trip end."],
  ["05", "Modern Premium Cabs", "Hatchback, Sedan, SUV and Tempo — fully AC and GPS-tracked."],
  ["06", "24×7 Customer Support", "WhatsApp and call support round the clock, even on holidays."],
  ["07", "500+ Routes Covered", "Bareilly, Nainital, Delhi, Agra, Lucknow and beyond across North India."],
  ["08", "Free Cancellation", "Plans change — cancel free up to 6 hours before your scheduled pickup."],
];

export default function Benefits() {
  const ref = useReveal<HTMLDivElement>("[data-reveal]", { stagger: 0.06, y: 30 });

  return (
    <section className="border-y border-ink/[0.08] bg-paper py-24">
      <div className="wrap">
        <SectionHead
          center
          eyebrow="Why YantraCabs"
          title="Benefits You"
          hi="Get"
          sub="Our service ensures you arrive comfortably and on time, making every ride enjoyable."
        />

        <div ref={ref} className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
          {/* left col 01-04 */}
          <div className="space-y-8">
            {benefits.slice(0, 4).map(([n, t, d]) => (
              <div key={n} data-reveal className="lg:text-right">
                <div className="num-taxi text-3xl">
                  {n}
                </div>
                <h3 className="card-title mt-1.5 !text-base">{t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{d}</p>
              </div>
            ))}
          </div>

          {/* center image */}
          <div data-reveal className="relative mx-auto hidden aspect-[3/4] w-64 overflow-hidden rounded-2xl shadow-[0_20px_50px_-18px_rgba(11,11,11,0.4)] lg:block">
            <Image src={img.yellowCab} alt="YantraCabs vehicle" fill sizes="256px" className="object-cover" />
          </div>

          {/* right col 05-08 */}
          <div className="space-y-8">
            {benefits.slice(4).map(([n, t, d]) => (
              <div key={n} data-reveal>
                <div className="num-taxi text-3xl">
                  {n}
                </div>
                <h3 className="card-title mt-1.5 !text-base">{t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

