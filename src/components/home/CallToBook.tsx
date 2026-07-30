"use client";

import Image from "next/image";
import Link from "next/link";
import { img, site } from "@/data/site";
import { Phone, Arrow } from "@/components/Icons";
import { useReveal, useParallax } from "@/hooks/useGsap";

export default function CallToBook() {
  const ref = useReveal<HTMLDivElement>("[data-reveal]", { stagger: 0.12, y: 44 });
  const parallax = useParallax<HTMLElement>(".ctb-img", 46);

  // No top border here — the Stats section above already closes with border-b-2.
  return (
    <section ref={parallax} className="bg-ink py-24 text-white">
      <div ref={ref} className="wrap grid items-center gap-14 lg:grid-cols-2">
        {/* framed image */}
        <div data-reveal className="relative mx-auto w-full max-w-md">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-2.5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white/5 shadow-[0_20px_50px_-16px_rgba(0,0,0,0.7)]">
              {/* Oversized so the parallax drift never exposes an edge. */}
              <div className="ctb-img absolute -inset-y-[8%] inset-x-0">
                <Image
                  src={img.callToBook}
                  alt="A yellow KoboCabs Tata Harrier on a highway"
                  fill
                  sizes="(max-width:1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* copy */}
        <div>
          <span data-reveal className="eyebrow text-white/60">Ready When You Are</span>
          <h2 data-reveal className="display t-h2 mt-3 text-white">
            Call Us To <span className="hi">Book A Cab</span>
          </h2>

          <a
            data-reveal
            href={`tel:${site.phoneRaw}`}
            className="mt-6 flex w-fit items-center gap-4 text-white"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-taxi text-ink">
              <Phone className="h-6 w-6" />
            </span>
            <span className="font-display text-4xl tracking-wide text-taxi sm:text-5xl">
              {site.phone}
            </span>
          </a>

          <p data-reveal className="mt-6 max-w-md text-white/60">
            Need a ride right now? Our friendly team is available round the clock
            for safe, affordable and on-time cabs — one call and you&apos;re set.
          </p>

          <div data-reveal className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-taxi !rounded-full">
              Book Online <Arrow className="h-4 w-4" />
            </Link>
            <a href={site.whatsapp} target="_blank" rel="noreferrer" className="btn !rounded-full border-2 border-white text-white hover:bg-white hover:text-ink">
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
