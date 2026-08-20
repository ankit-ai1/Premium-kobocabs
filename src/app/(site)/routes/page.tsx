import type { Metadata } from "next";
import { routeGroups, site } from "@/data/site";
import { PageHero } from "@/components/Bits";
import { Arrow, Chat } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import BookLink from "@/components/BookLink";
import RouteBookLink from "@/components/RouteBookLink";

export const metadata: Metadata = {
  title: `Routes — ${site.name}`,
  description:
    "Transparent fares and verified drivers across 100+ outstation, one-way and airport transfer routes across North India.",
};

export default function RoutesPage() {
  const total = routeGroups.reduce((s, g) => s + g.count, 0);

  return (
    <>
      <PageHero
        eyebrow="All Routes"
        title="Popular Outstation"
        hi="Cab Routes"
        sub={`Transparent fares, verified drivers and zero advance booking across ${total}+ outstation, one-way and airport transfer routes across North India.`}
      />

      <section className="wrap py-20">
        <Reveal className="space-y-20" stagger={0.1}>
          {routeGroups.map((g) => (
            <div key={g.from} data-reveal>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <span className="eyebrow">Departures</span>
                  <h2 className="display t-h2 mt-2.5">
                    {g.lead ?? "Cabs From"} <span className="hi">{g.from}</span>
                  </h2>
                </div>
                <span className="shrink-0 rounded-full bg-taxi px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-ink">
                  {g.count} routes
                </span>
              </div>
              <div className="mt-5 h-px bg-gradient-to-r from-ink/20 via-ink/8 to-transparent" />

              {/* A grid, not flex-wrap: with 80 routes a ragged right edge reads as
                  untidy, and equal columns line every chip up. */}
              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                {g.routes.map((r) => (
                  <RouteBookLink
                    key={r}
                    route={r}
                    className="group flex items-center justify-between gap-2 rounded-full border border-ink/[0.08] bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-taxi/50 hover:bg-taxi/10"
                    style={{ boxShadow: "var(--shadow-card)" }}
                  >
                    <span className="truncate">{r} Cabs</span>
                    <Arrow className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-ink-muted opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:text-ink group-hover:opacity-100" />
                  </RouteBookLink>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* somewhere else CTA */}
      <section className="border-t border-ink/[0.08] bg-paper py-24">
        <div className="wrap">
          <div className="relative overflow-hidden rounded-3xl border border-ink/[0.08] bg-white px-6 py-16 text-center shadow-[var(--shadow-float)]">
            {/* Subtle yellow glow instead of a hard offset block */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(50% 60% at 50% 0%, rgba(255,206,0,0.22) 0%, rgba(255,206,0,0) 70%)",
              }}
            />
            <h2 className="display t-display relative">
              Travelling <span className="hi">Somewhere Else?</span>
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-ink-muted">
              Enter any pickup and drop — we cover {site.stats.routes} routes
              across North India with the same fixed, all-inclusive pricing.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-4">
              <BookLink className="btn-taxi">
                Book Any Route <Arrow className="h-4 w-4" />
              </BookLink>
              <a href={site.whatsapp} target="_blank" rel="noreferrer" className="btn-outline">
                <Chat className="h-4 w-4" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
