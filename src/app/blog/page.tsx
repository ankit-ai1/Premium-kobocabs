import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { posts, blogCategories, site } from "@/data/site";
import { PageHero } from "@/components/Bits";
import { Arrow, Clock, Search } from "@/components/Icons";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: `Blog — ${site.name}`,
  description:
    "Expert travel guides for every North India road trip — hill stations, pilgrimages, one-way routes and more.",
};

const filters = ["All", "Travel Guides", "Hill Stations", "Pilgrimage", "Route Tips", "North India"];

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="KoboCabs Blog"
        title="Travel Guides &"
        hi="Route Tips"
        sub="Expert guides for every North India road trip — hill stations, pilgrimages, one-way routes and more."
      >
        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f, i) => (
            <span
              key={f}
              className={`rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest ${
                i === 0
                  ? "bg-taxi text-ink"
                  : "border border-ink/[0.08] bg-white text-ink-muted"
              }`}
            >
              {f}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="wrap grid gap-12 py-16 lg:grid-cols-[1fr_320px]">
        {/* Main */}
        <div>
          {/* Featured */}
          <Reveal>
            <Link
              data-reveal
              href={`/blog`}
              className="card card-hover group block overflow-hidden"
            >
              <div className="relative aspect-[21/9] overflow-hidden bg-ink/5">
                <Image src={featured.image} alt={featured.title} fill sizes="(max-width:1024px) 100vw, 60vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/50 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-taxi px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-ink shadow-[0_6px_16px_-4px_rgba(11,11,11,0.4)]">
                  {featured.category}
                </span>
              </div>
              <div className="p-7">
                <div className="text-[11px] font-bold uppercase tracking-widest text-ink-muted">
                  {featured.date}
                </div>
                <h2 className="card-title-lg mt-2">{featured.title}</h2>
                <p className="mt-3 leading-relaxed text-ink-muted">{featured.excerpt}</p>
                <div className="mt-5 flex items-center justify-between border-t border-ink/[0.08] pt-4">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-ink-muted">
                    <Clock className="h-4 w-4" /> {featured.read}
                  </span>
                  <span className="nudge flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-ink">
                    Read More <Arrow className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>

          {/* Grid */}
          <Reveal className="mt-8 grid gap-6 sm:grid-cols-2" stagger={0.08}>
            {rest.map((p) => (
              <Link
                key={p.slug}
                data-reveal
                href="/blog"
                className="card card-hover group flex flex-col overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-ink/5">
                  <Image src={p.image} alt={p.title} fill sizes="(max-width:640px) 100vw, 30vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink/45 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-taxi px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-ink shadow-[0_4px_12px_-2px_rgba(11,11,11,0.35)]">
                    {p.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-ink-muted">{p.date}</div>
                  <h3 className="card-title mt-2 !text-[1.0625rem]">{p.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">{p.excerpt}</p>
                  <span className="mt-auto flex items-center gap-1.5 border-t border-ink/[0.08] pt-4 text-xs font-semibold text-ink-muted">
                    <Clock className="h-4 w-4" /> {p.read}
                  </span>
                </div>
              </Link>
            ))}
          </Reveal>

          {/* pagination (visual) */}
          <div className="mt-12 flex justify-center gap-2">
            {[1, 2, 3, 4].map((n) => (
              <span
                key={n}
                className={`grid h-10 w-10 place-items-center rounded-lg text-sm font-bold ${
                  n === 1
                    ? "bg-taxi text-ink"
                    : "border border-ink/[0.08] bg-white text-ink-muted"
                }`}
              >
                {n}
              </span>
            ))}
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-ink/[0.08] bg-white px-4 text-sm font-bold">
              Next <Arrow className="h-4 w-4" />
            </span>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="card p-5">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-ink-muted">
              Search Travel Content
            </h3>
            <div className="mt-3 flex gap-2">
              <input placeholder="Search…" className="input !py-2.5" />
              <button
                className="chip-taxi h-auto w-11 shrink-0 rounded-lg transition-transform duration-300 ease-out hover:scale-105"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-ink p-6 text-white shadow-[var(--shadow-card)]">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-taxi">
              About KoboCabs
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              North India&apos;s trusted outstation cab service, based in {site.city}.
              We cover {site.stats.routes} routes with verified drivers, transparent
              fares and zero advance booking.
            </p>
            <Link href="/contact" className="btn-taxi mt-4 w-full !py-3.5 text-xs">
              Book a Cab <Arrow className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="card p-5">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-ink-muted">
              Recent Posts
            </h3>
            <ul className="mt-3 space-y-4">
              {posts.slice(0, 5).map((p) => (
                <li key={p.slug} className="border-b border-ink/[0.08] pb-3 last:border-0 last:pb-0">
                  <Link
                    href="/blog"
                    className="text-sm font-semibold leading-snug transition-colors hover:text-taxi"
                  >
                    {p.title}
                  </Link>
                  <div className="mt-1 text-xs text-ink-muted">{p.date}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-5">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-ink-muted">
              Categories
            </h3>
            <ul className="mt-3 space-y-1">
              {blogCategories.map((c) => (
                <li key={c.name}>
                  <Link
                    href="/blog"
                    className="flex items-center justify-between rounded-lg px-2 py-2 text-sm font-semibold transition-colors hover:bg-taxi/10"
                  >
                    {c.name}
                    <span className="grid h-6 min-w-[1.5rem] place-items-center rounded-full bg-taxi px-2 text-xs font-bold text-ink">
                      {c.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}
