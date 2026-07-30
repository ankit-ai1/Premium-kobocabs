"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { blogCategories as categories, posts, site } from "@/data/site";
import { Arrow, Clock, Search } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import { DisplayHeading } from "@/components/Bits";
import BookLink from "@/components/BookLink";

const ALL = "All";
const filters = [ALL, ...categories.map((c) => c.name)];

/** One featured card plus a 2×2 grid below it. */
const PER_PAGE = 5;

type Lenis = { scrollTo: (t: HTMLElement, o?: Record<string, unknown>) => void };

/**
 * Page numbers to render, collapsing long runs to an ellipsis so the control
 * stays one line as the blog grows: 1 … 4 5 6 … 12.
 */
function pageNumbers(total: number, current: number): (number | "gap")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const shown = Array.from(
    new Set([1, current - 1, current, current + 1, total])
  )
    .filter((n) => n >= 1 && n <= total)
    .sort((a, b) => a - b);

  return shown.flatMap((n, i) =>
    i > 0 && n - shown[i - 1] > 1 ? (["gap", n] as (number | "gap")[]) : [n]
  );
}

export default function BlogList() {
  const [active, setActive] = useState(ALL);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);
  const term = search.trim().toLowerCase();

  const visible = posts.filter((p) => {
    const matchesCategory = active === ALL || p.category === active;
    if (!matchesCategory) return false;
    if (!term) return true;

    const searchable = [
      p.title,
      p.excerpt,
      p.category,
      p.date,
      ...p.content.map((block) => ("h2" in block ? block.h2 : block.p)),
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(term);
  });

  const suggestions = term
    ? visible.slice(0, 4)
    : [];

  const totalPages = Math.max(1, Math.ceil(visible.length / PER_PAGE));
  // Clamped rather than stored: if a filter shrinks the list under the page
  // we're on, fall back to the last real page instead of rendering nothing.
  const current = Math.min(page, totalPages);

  const pageItems = visible.slice((current - 1) * PER_PAGE, current * PER_PAGE);
  // First post of the page is the big card, the rest fill the 2×2 grid. A page
  // holding a single post gets the featured card and no empty grid slots.
  const featured = pageItems[0] ?? null;
  const grid = pageItems.slice(1);

  /** Filtering from any control restarts the run at page 1. */
  const filterBy = (name: string) => {
    setActive(name);
    setPage(1);
  };

  const goToPage = (n: number) => {
    const next = Math.min(Math.max(n, 1), totalPages);
    if (next === current) return;
    setPage(next);

    // Back to the featured card, or the new page starts mid-scroll. Lenis owns
    // scrolling here; the anchor's scroll-mt clears the fixed navbar in both
    // paths, so no JS offset (see scrollToBook).
    const el = topRef.current;
    if (!el) return;
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) lenis.scrollTo(el, { duration: 1 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  const chip = (label: string) =>
    `rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ease-out ${
      active === label
        ? "bg-taxi text-ink shadow-[0_8px_20px_-6px_rgba(11,11,11,0.35)]"
        : "border border-ink/[0.08] bg-white text-ink-muted hover:-translate-y-0.5 hover:border-taxi/50 hover:text-ink"
    }`;

  // Shared by the numbers and the Prev/Next buttons so the row reads as one
  // control. Disabled ends drop the lift and the pointer.
  const pageBtn = (isActive: boolean) =>
    `inline-flex h-10 min-w-[2.5rem] items-center justify-center rounded-full px-3.5 text-sm font-bold transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-40 ${
      isActive
        ? "bg-taxi text-ink shadow-[0_8px_20px_-6px_rgba(11,11,11,0.35)]"
        : "border border-ink/[0.08] bg-white text-ink-muted hover:-translate-y-0.5 hover:border-taxi/50 hover:text-ink"
    }`;

  return (
    <>
      {/* Filters sit in the white articles area, fully clear of PageHero.
          They used to be pulled up with -mt-6 into the header, whose
          overflow-hidden sliced off the top half of every chip. */}
      {/* Anchor for the page-change scroll — scroll-mt clears the fixed navbar. */}
      <div ref={topRef} className="wrap scroll-mt-28 pb-2 pt-10">
        <div className="flex flex-wrap gap-2.5">
          {filters.map((f) => (
            <button key={f} onClick={() => filterBy(f)} className={chip(f)}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <section className="wrap grid gap-12 pb-16 pt-8 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          {featured && (
            // Remount per page/filter so the reveal replays for the new card.
            <Reveal key={`featured-${active}-${term}-${current}`}>
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
              // Remount on filter/page change so the reveal replays for new cards.
              key={`grid-${active}-${term}-${current}`}
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
                <button onClick={() => filterBy(ALL)} className="btn-outline mt-6">
                  Show all articles
                </button>
              </div>
            )
          )}

          {/* Pagination — hidden when everything already fits on one page. */}
          {totalPages > 1 && (
            <nav
              aria-label="Blog pagination"
              className="mt-12 flex flex-wrap items-center justify-center gap-2 border-t border-ink/[0.08] pt-8"
            >
              <button
                onClick={() => goToPage(current - 1)}
                disabled={current === 1}
                className={`${pageBtn(false)} gap-1.5`}
                aria-label="Previous page"
              >
                <Arrow className="h-4 w-4 rotate-180" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              {pageNumbers(totalPages, current).map((n, i) =>
                n === "gap" ? (
                  <span
                    key={`gap-${i}`}
                    aria-hidden
                    className="grid h-10 w-6 place-items-center text-sm font-bold text-ink-muted"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={n}
                    onClick={() => goToPage(n)}
                    className={pageBtn(n === current)}
                    aria-current={n === current ? "page" : undefined}
                    aria-label={`Page ${n}`}
                  >
                    {n}
                  </button>
                )
              )}

              <button
                onClick={() => goToPage(current + 1)}
                disabled={current === totalPages}
                className={`${pageBtn(false)} gap-1.5`}
                aria-label="Next page"
              >
                <span className="hidden sm:inline">Next</span>
                <Arrow className="h-4 w-4" />
              </button>
            </nav>
          )}
        </div>

        {/* Sidebar */}
        <aside className="min-w-0 space-y-6">
          <div className="card p-5">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-ink-muted">
              Search Travel Content
            </h3>
            <div className="mt-3 flex gap-2">
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.currentTarget.value);
                  setPage(1);
                }}
                placeholder="Search…"
                className="input !py-2.5"
              />
              <button
                className="chip-taxi h-auto w-11 shrink-0 rounded-lg transition-transform duration-300 ease-out hover:scale-105"
                aria-label="Search"
                type="button"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>

            {term && (
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-ink-muted">
                  <span>Suggestions</span>
                  <span>{visible.length} match{visible.length === 1 ? "" : "es"}</span>
                </div>

                {suggestions.length > 0 ? (
                  <ul className="space-y-3">
                    {suggestions.map((post) => (
                      <li key={post.slug}>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="block rounded-2xl border border-ink/[0.08] px-3 py-3 text-sm font-semibold text-ink transition-colors hover:border-taxi/60 hover:text-taxi"
                        >
                          <span className="block line-clamp-2">{post.title}</span>
                          <span className="mt-1 block text-xs text-ink-muted">{post.category}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm leading-relaxed text-ink-muted">
                    No related articles found for "{search}".
                  </p>
                )}
              </div>
            )}
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
                    onClick={() => filterBy(c.name)}
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
