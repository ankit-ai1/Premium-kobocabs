import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, site } from "@/data/site";
import { Arrow, Clock } from "@/components/Icons";
import { DisplayHeading } from "@/components/Bits";
import BookLink from "@/components/BookLink";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return { title: `Not found — ${site.name}` };
  return {
    title: `${post.title} — ${site.name}`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const related = posts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <article className="pb-24">
      {/* Hero image */}
      <div className="relative h-[38vh] min-h-[260px] w-full overflow-hidden bg-ink/5 sm:h-[46vh]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />
      </div>

      {/* Header */}
      <div className="wrap -mt-20 relative">
        <div className="mx-auto max-w-3xl">
          <div className="card p-7 sm:p-9">
            <span className="inline-flex rounded-full bg-taxi px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-ink">
              {post.category}
            </span>
            {/* Same Anton + yellow treatment as the hero and every SectionHead */}
            <DisplayHeading
              as="h1"
              text={post.title}
              hi={post.titleHi}
              className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)]"
            />
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-ink/[0.08] pt-4 text-xs font-semibold text-ink-muted">
              <span>{post.date}</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {post.read}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="wrap mt-12">
        <div className="mx-auto max-w-3xl">
          <p className="text-lg font-medium leading-relaxed text-ink">
            {post.excerpt}
          </p>
          {/* Headings take the display style; body copy stays in Inter. */}
          <div className="mt-8 text-[1.0625rem] leading-[1.75] text-ink-muted">
            {post.content.map((block, i) =>
              "h2" in block ? (
                <DisplayHeading
                  key={i}
                  text={block.h2}
                  // text-ink explicitly: the body wrapper is ink-muted and
                  // headings would otherwise inherit that grey.
                  className="t-h3 mt-11 text-ink first:mt-0"
                />
              ) : (
                <p key={i} className="mt-6 first:mt-0">
                  {block.p}
                </p>
              )
            )}
          </div>

          {/* End CTA */}
          <div className="relative mt-14 overflow-hidden rounded-3xl bg-ink px-6 py-12 text-center text-white">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(60% 70% at 50% 0%, rgba(255,206,0,0.18) 0%, rgba(255,206,0,0) 65%)",
              }}
            />
            <h2 className="display t-h3 relative text-white">
              Ready For This <span className="hi">Trip?</span>
            </h2>
            <p className="relative mx-auto mt-3 max-w-md text-sm text-white/65">
              Clear per-kilometre fares, verified drivers and zero advance.
            </p>
            <BookLink className="btn-taxi relative mt-6">
              Book A Cab <Arrow className="h-4 w-4" />
            </BookLink>
          </div>

          <Link
            href="/blog"
            className="nudge mt-10 inline-flex items-center gap-1.5 py-1.5 text-xs font-bold uppercase tracking-widest text-ink"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="wrap mt-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="display t-h3">
              More In <span className="hi">{post.category}</span>
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
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
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-ink-muted">
                      {p.date}
                    </div>
                    <DisplayHeading
                      as="h3"
                      text={p.title}
                      hi={p.titleHi}
                      className="mt-2 line-clamp-3 text-[1.0625rem]"
                    />
                    <span className="mt-auto flex items-center gap-1.5 pt-4 text-xs font-semibold text-ink-muted">
                      <Clock className="h-4 w-4" /> {p.read}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
