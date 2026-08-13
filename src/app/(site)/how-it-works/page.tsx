import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { steps, promises, img, site } from "@/data/site";
import { PageHero, SectionHead } from "@/components/Bits";
import { Arrow, Check } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import BookLink from "@/components/BookLink";

export const metadata: Metadata = {
  title: `How It Works — ${site.name}`,
  description:
    "Book a cab in four simple steps: enter locations, pick your cab, confirm booking, pay and ride.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How It Works"
        title="Booking Made"
        hi="Effortless"
        sub="Four simple steps to secure your outstation cab — the whole process takes under three minutes."
      />

      {/* Steps */}
      <section className="wrap py-24">
        <Reveal className="grid gap-6 lg:grid-cols-4" stagger={0.12}>
          {steps.map((s, i) => (
            <div key={s.n} data-reveal className="group relative">
              <div className="card card-hover h-full p-7">
                <div className="flex items-start justify-between">
                  <span className="num-taxi text-5xl leading-none">{s.n}</span>
                  <span className="chip-taxi h-8 w-8 rounded-lg text-sm font-extrabold">
                    {i + 1}
                  </span>
                </div>
                <h3 className="card-title mt-5">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.text}</p>
              </div>

              {/* Connector: a hairline that fills yellow as the step is hovered */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -right-6 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-ink/12 lg:block"
                >
                  <span className="absolute inset-y-0 left-0 w-0 bg-taxi transition-all duration-500 ease-out group-hover:w-full" />
                  <Arrow className="absolute -right-1 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink/25 transition-colors duration-500 group-hover:text-taxi" />
                </span>
              )}
            </div>
          ))}
        </Reveal>
      </section>

      {/* Split: image + promise */}
      {/* overflow-hidden: the decorative glow below sits at -right-6, which is
          wider than the wrap's mobile padding and would otherwise push the
          page 4px past the viewport. */}
      <section className="overflow-hidden border-y border-ink/[0.08] bg-paper py-24">
        {/* min-w-0 belongs on the grid items, not the container: their default
            min-width:auto is what refuses to shrink below content width. */}
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="min-w-0" stagger={0.1}>
            <div data-reveal className="relative">
              {/* Soft yellow shape behind the frame instead of a hard shadow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-6 -right-6 h-2/3 w-2/3 rounded-full opacity-70 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,206,0,0.5) 0%, rgba(255,206,0,0) 70%)",
                }}
              />
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink/5 shadow-[0_20px_55px_-20px_rgba(11,11,11,0.4)]">
                <Image
                  src="https://res.cloudinary.com/dtg3lepr4/image/upload/v1786519619/ChatGPT_Image_Aug_12_2026_12_55_55_PM_theatb.png"
                  alt="Verified YantraCabs driver"
                  fill
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <div className="min-w-0">
            <SectionHead
              eyebrow="Our Promise"
              title="Every Ride,"
              hi="Guaranteed"
              sub="What you book is exactly what shows up — a verified driver, a clean vehicle, and a fare with no surprises."
            />
            <Reveal className="mt-8 space-y-5" stagger={0.08}>
              {promises.slice(0, 4).map((p) => (
                <div key={p.title} data-reveal className="flex items-start gap-4">
                  <span className="chip-taxi mt-0.5 h-8 w-8 shrink-0">
                    <Check className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="card-title !text-base">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">{p.text}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-taxi py-14">
        <div className="wrap grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {[
            [site.stats.rides, "Rides Completed"],
            [site.stats.routes, "Routes Covered"],
            [site.stats.rating + "★", "Average Rating"],
            ["24×7", "Support"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-5xl leading-none tracking-wide sm:text-6xl">
                {n}
              </div>
              <div className="mt-2 text-[11px] font-bold uppercase tracking-widest text-ink/70">
                {l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="wrap py-24 text-center">
        <h2 className="display t-display">
          Ready To <span className="hi">Ride?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-ink-muted">
          Book in under a minute — no advance, free cancellation up to 6 hours before pickup.
        </p>
        <BookLink className="btn-ink mt-8">
          Book Your Cab <Arrow className="h-4 w-4" />
        </BookLink>
      </section>
    </>
  );
}
