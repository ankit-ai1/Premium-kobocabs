import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { premiumCabs, tripTypes, promises, faqs, site } from "@/data/site";
import { PageHero, SectionHead } from "@/components/Bits";
import { Users, Arrow, Check, Chat } from "@/components/Icons";
import FareEstimator from "@/components/FareEstimator";
import Faq from "@/components/Faq";
import Reveal from "@/components/Reveal";
import BookLink from "@/components/BookLink";
import CabBookLink from "@/components/CabBookLink";

export const metadata: Metadata = {
  title: `Premium Cabs — ${site.name}`,
  description:
    "Choose from Hatchback, Sedan, SUV and Tempo Traveller. Transparent per-km pricing, verified drivers, GST-inclusive fares.",
};

export default function PremiumCabsPage() {
  return (
    <>
      <PageHero
        eyebrow="Premium Cabs"
        title="Travel In Comfort,"
        hi="Not Compromise"
        sub="Every cab is fully air-conditioned, GPS-tracked, and driven by a background-verified driver. Choose the right vehicle for your journey — budget to spacious."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          {[
            ["100%", "Verified Drivers"],
            [site.stats.routes, "Routes Covered"],
            ["Zero", "Advance Required"],
            ["24×7", "Support"],
            [`${site.stats.rating}★`, "Average Rating"],
          ].map(([n, l]) => (
            <div key={l} className="card px-4 py-2.5">
              <div className="font-display text-xl tracking-wide">{n}</div>
              <div className="text-[11px] font-semibold uppercase tracking-widest text-ink-muted">
                {l}
              </div>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Trip types */}
      <section className="wrap py-20">
        <SectionHead
          eyebrow="Find Your Cab"
          title="What Kind Of Trip"
          hi="Are You Planning?"
          sub="Match your journey type to the ideal vehicle in seconds."
        />
        <Reveal className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {tripTypes.map((t) => (
            <div key={t.title} data-reveal className="card card-hover p-6">
              <h3 className="card-title">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t.note}</p>
              <span className="mt-4 inline-block rounded-full bg-taxi px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-ink">
                {t.cab}
              </span>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Premium cabs in detail */}
      <section className="border-y border-ink/[0.08] bg-paper py-24">
        <div className="wrap">
          <SectionHead
            center
            eyebrow="Vehicles"
            title="Premium Cabs"
            hi="In Detail"
            sub="Transparent per-kilometre pricing. The fare you see includes driver allowance, toll and GST."
          />
          <Reveal className="mt-14 space-y-8" stagger={0.1}>
            {premiumCabs.map((c, i) => (
              <article
                key={c.id}
                data-reveal
                className={`card card-hover group grid overflow-hidden lg:grid-cols-2 ${
                  i % 2 ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-ink/5 lg:aspect-auto">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(max-width:1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-taxi px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-ink shadow-[0_6px_16px_-4px_rgba(11,11,11,0.4)]">
                    {c.tag}
                  </span>
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-10">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="display t-h3">{c.name}</h3>
                    <span className="num-taxi shrink-0 text-4xl">
                      ₹{c.ratePerKm}
                      <span className="text-lg text-ink [text-shadow:none]">/km</span>
                    </span>
                  </div>
                  <p className="mt-3 leading-relaxed text-ink-muted">{c.blurb}</p>

                  <div className="mt-5 flex flex-wrap items-center gap-4 text-sm font-semibold text-ink-muted">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" /> {c.seats} seats
                    </span>
                    <span className="border-l border-ink/15 pl-4">AC</span>
                    <span className="border-l border-ink/15 pl-4">
                      {c.models.join(" · ")}
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {c.bestFor.map((b) => (
                      <span
                        key={b}
                        className="rounded-full border border-ink/12 bg-paper px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-ink-muted"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  <CabBookLink cab={c.name} className="btn-ink mt-7 self-start">
                    Book {c.name} <Arrow className="h-4 w-4" />
                  </CabBookLink>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <FareEstimator />

      {/* Promise */}
      <section className="relative overflow-hidden bg-ink py-24 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(55% 45% at 50% 0%, rgba(255,206,0,0.14) 0%, rgba(255,206,0,0) 70%)",
          }}
        />
        <div className="wrap relative">
          <SectionHead
            light
            center
            eyebrow="Our Promise"
            title={`The ${site.name}`}
            hi="Standard"
            sub="Every booking — regardless of cab type or distance — meets these non-negotiable standards."
          />
          <Reveal className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {promises.map((p) => (
              <div key={p.title} data-reveal className="card-dark p-6">
                <span className="chip-taxi h-11 w-11">
                  <Check className="h-5 w-5" />
                </span>
                {/* Explicit white/light-grey — these must stay readable on ink. */}
                <h3 className="card-title mt-4 !text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{p.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="wrap py-24">
        <SectionHead center eyebrow="FAQ" title="Frequently Asked" hi="Questions" />
        <div className="mt-12">
          <Faq items={faqs} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-ink/[0.08] bg-paper py-20">
        <div className="wrap text-center">
          <h2 className="display t-h2">
            Not Sure Which <span className="hi">Cab To Choose?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-muted">
            Share your route and group size — we&apos;ll recommend the right
            vehicle and give you a precise quote instantly.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <BookLink className="btn-taxi">
              Book Your Cab Now <Arrow className="h-4 w-4" />
            </BookLink>
            <a href={site.whatsapp} target="_blank" rel="noreferrer" className="btn-outline">
              <Chat className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
