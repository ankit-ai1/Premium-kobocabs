"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { posts, site } from "@/data/site";
import { Arrow, Clock, Search } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import { DisplayHeading } from "@/components/Bits";
import BookLink from "@/components/BookLink";

const ALL = "All";
const categories = Array.from(
  posts.reduce((map, post) => {
    map.set(post.category, (map.get(post.category) ?? 0) + 1);
    return map;
  }, new Map<string, number>())
).map(([name, count]) => ({ name, count }));

const filters = [ALL, ...categories.map((c) => c.name)];

export default function BlogList() {
  const [active, setActive] = useState(ALL);

  const visible =
    active === ALL ? posts : posts.filter((p) => p.category === active);

  // The featured slot only makes sense on the unfiltered list; inside a
  // category every post goes into the grid so nothing gets buried.
  const featured = active === ALL ? visible[0] : null;
  const grid = featured ? visible.slice(1) : visible;

  const chip = (label: string) =>
    `rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ease-out ${
      active === label
        ? "bg-taxi text-ink shadow-[0_8px_20px_-6px_rgba(11,11,11,0.35)]"
        : "border border-ink/[0.08] bg-white text-ink-muted hover:-translate-y-0.5 hover:border-taxi/50 hover:text-ink"
    }`;

  return (
    <>
      {/* Filters sit in the white articles area, fully clear of PageHero.
          They used to be pulled up with -mt-6 into the header, whose
          overflow-hidden sliced off the top half of every chip. */}
      <div className="wrap pb-2 pt-10">
        <div className="flex flex-wrap gap-2.5">
          {filters.map((f) => (
            <button key={f} onClick={() => setActive(f)} className={chip(f)}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <section className="wrap grid gap-12 pb-16 pt-8 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          <p className="mb-6 text-sm font-semibold text-ink-muted">
            {visible.length} {visible.length === 1 ? "article" : "articles"}
            {active !== ALL && ` in ${active}`}
          </p>

          {featured && (
            <Reveal>
              <Link
                data-reveal
                href={`/blog/${featured.slug}`}
                className="card card-hover group block overflow-hidden"
              >
                <div className="relative aspect-[21/9] overflow-hidden bg-ink/5">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="(max-width:1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/50 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-taxi px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-ink shadow-[0_6px_16px_-4px_rgba(11,11,11,0.4)]">
                    {featured.category}
                  </span>
                </div>
                <div className="p-7">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-ink-muted">
                    {featured.date}
                  </div>
                  <DisplayHeading
                    text={featured.title}
                    hi={featured.titleHi}
                    className="mt-2 text-[clamp(1.5rem,2.6vw,2.15rem)]"
                  />
                  {/* Short yellow rule tying the card back to the brand */}
                  <span className="mt-3 block h-1 w-14 rounded-full bg-taxi" />
                  <p className="mt-3 leading-relaxed text-ink-muted">
                    {featured.excerpt}
                  </p>
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
          )}

          {grid.length > 0 ? (
            <Reveal
              // Remount on filter change so the reveal replays for new cards.
              key={active}
              className={`grid gap-6 sm:grid-cols-2 ${featured ? "mt-8" : ""}`}
              stagger={0.08}
            >
              {grid.map((p) => (
                <Link
                  key={p.slug}
                  data-reveal
                  href={`/blog/${p.slug}`}
                  className="card card-hover group flex flex-col overflow-hidden"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink/5">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width:640px) 100vw, 30vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink/45 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-taxi px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-ink shadow-[0_4px_12px_-2px_rgba(11,11,11,0.35)]">
                      {p.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-ink-muted">
                      {p.date}
                    </div>
                    <DisplayHeading
                      as="h3"
                      text={p.title}
                      hi={p.titleHi}
                      className="mt-2 line-clamp-3 text-[1.15rem]"
                    />
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                      {p.excerpt}
                    </p>
                    <span className="mt-auto flex items-center gap-1.5 border-t border-ink/[0.08] pt-4 text-xs font-semibold text-ink-muted">
                      <Clock className="h-4 w-4" /> {p.read}
                    </span>
                  </div>
                </Link>
              ))}
            </Reveal>
          ) : (
            !featured && (
              <div className="card p-10 text-center">
                <p className="card-title">No articles here yet</p>
                <p className="mt-2 text-sm text-ink-muted">
                  Nothing published under {active} so far — try another category.
                </p>
                <button onClick={() => setActive(ALL)} className="btn-outline mt-6">
                  Show all articles
                </button>
              </div>
            )
          )}
        </div>

        {/* Sidebar */}
        <aside className="min-w-0 space-y-6">
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
            <BookLink className="btn-taxi mt-4 w-full !py-3.5 text-xs">
              Book a Cab <Arrow className="h-3.5 w-3.5" />
            </BookLink>
          </div>

          <div className="card p-5">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-ink-muted">
              Recent Posts
            </h3>
            <ul className="mt-3 space-y-4">
              {posts.slice(0, 5).map((p) => (
                <li
                  key={p.slug}
                  className="border-b border-ink/[0.08] pb-3 last:border-0 last:pb-0"
                >
                  <Link
                    href={`/blog/${p.slug}`}
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
              {categories.map((c) => (
                <li key={c.name}>
                  <button
                    onClick={() => setActive(c.name)}
                    className={`flex w-full items-center justify-between rounded-lg px-2 py-2.5 text-sm font-semibold transition-colors ${
                      active === c.name ? "bg-taxi/15 text-ink" : "hover:bg-taxi/10"
                    }`}
                  >
                    {c.name}
                    <span className="grid h-6 min-w-[1.5rem] place-items-center rounded-full bg-taxi px-2 text-xs font-bold text-ink">
                      {c.count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}
