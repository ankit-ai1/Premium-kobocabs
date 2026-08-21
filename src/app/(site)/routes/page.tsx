import type { Metadata } from "next";
import { oneWayTaxiRoutes, routeGroups, tourPackages, site } from "@/data/site";
import { PageHero } from "@/components/Bits";
import { Arrow, Chat } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import BookLink from "@/components/BookLink";
import RouteBookLink from "@/components/RouteBookLink";

/** Pre-typed WhatsApp enquiry for a tour package. */
function whatsappTourLink(title: string) {
  return `${site.whatsapp}?text=${encodeURIComponent(
    `Hi YantraCabs, I would like a quote for the ${title} tour package.`
  )}`;
}

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

      {/* Tour packages — multi-day trips, priced on request rather than per km. */}
      <section className="border-t border-ink/[0.08] bg-paper py-20">
        <div className="wrap">
          <span className="eyebrow">Tour Packages</span>
          <h2 className="display t-h2 mt-2.5">
            Multi-Day <span className="hi">Tours &amp; Yatras</span>
          </h2>
          <p className="mt-4 max-w-2xl text-ink-muted">
            Planned end to end with the same cab and driver throughout. Tell us your
            dates and group size and we&apos;ll send a day-by-day plan with a fixed price.
          </p>

          <Reveal className="mt-12 grid gap-6 lg:grid-cols-2" stagger={0.08}>
            {tourPackages.map((t) => (
              <div key={t.title} data-reveal className="card p-6 sm:p-8">
                <h3 className="card-title-lg">{t.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{t.note}</p>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {t.items.map((i) => (
                    <span
                      key={i}
                      className="rounded-full border border-ink/[0.08] bg-paper px-3.5 py-1.5 text-[13px] font-semibold text-ink"
                    >
                      {i}
                    </span>
                  ))}
                </div>

                <a
                  href={whatsappTourLink(t.title)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline mt-7 !rounded-full !py-3 text-xs"
                >
                  <Chat className="h-4 w-4" /> Ask for a quote
                </a>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* One-way service destinations. */}
      <section className="border-t border-ink/[0.08] bg-white py-20">
        <div className="wrap">
          <span className="eyebrow">One-Way Taxi Service</span>
          <h2 className="display t-h2 mt-2.5">
            One-Way <span className="hi">Taxi Service</span>
          </h2>
          <p className="mt-4 max-w-2xl text-ink-muted">
            Book a reliable one-way cab from Delhi NCR and across North India to
            these popular cities, towns and pilgrimage destinations.
          </p>

          <Reveal className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5" stagger={0.02}>
            {oneWayTaxiRoutes.map((destination) => (
              <RouteBookLink
                key={destination}
                route={`Delhi NCR to ${destination}`}
                className="group flex items-center justify-between gap-2 rounded-full border border-ink/[0.08] bg-paper px-4 py-2.5 text-[13px] font-semibold text-ink transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-taxi/50 hover:bg-taxi/10"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <span className="truncate">{destination}</span>
                <Arrow className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-ink-muted opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:text-ink group-hover:opacity-100" />
              </RouteBookLink>
            ))}
          </Reveal>
        </div>
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
              across North India with the same clear per-kilometre pricing.
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
