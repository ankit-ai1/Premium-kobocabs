"use client";

import { reviews, site } from "@/data/site";
import { SectionHead } from "@/components/Bits";
import { Chat, Star } from "@/components/Icons";
import { whatsappReviewLink } from "@/lib/whatsapp";
import { useReveal } from "@/hooks/useGsap";

export default function Reviews() {
  const ref = useReveal<HTMLDivElement>("[data-reveal]", { stagger: 0.1, y: 50, scale: 0.97 });

  return (
    <section id="reviews" className="wrap scroll-mt-28 py-20">
      <SectionHead
        eyebrow="Rider Stories"
        title="What Our Riders"
        hi="Say"
        sub={`Join thousands of happy customers who trust ${site.name} for honest fares, verified drivers, and on-time pickups.`}
      />

      <div ref={ref} className="mt-12 grid gap-6 md:grid-cols-3">
        {reviews.map((r) => (
          <figure
            key={r.name}
            data-reveal
            className="card card-hover group relative flex flex-col overflow-hidden p-7"
          >
            {/* Oversized decorative quote mark that warms up on hover. */}
            <span
              aria-hidden
              className="pointer-events-none absolute -right-1 -top-10 select-none font-display text-[8rem] leading-none text-taxi/20 transition-all duration-500 ease-out group-hover:-top-8 group-hover:text-taxi/40"
            >
              &rdquo;
            </span>

            {/* Yellow accent bar that draws itself across on hover. */}
            <span className="absolute inset-x-0 top-0 h-1 w-0 bg-taxi transition-all duration-500 ease-out group-hover:w-full" />

            <span className="relative flex gap-0.5 text-taxi">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:scale-125"
                  style={{ transitionDelay: `${i * 45}ms` }}
                />
              ))}
            </span>

            <blockquote className="relative mt-4 flex-1 text-[15px] leading-relaxed text-ink">
              &ldquo;{r.text}&rdquo;
            </blockquote>

            <figcaption className="relative mt-6 flex items-center gap-3 border-t border-ink/10 pt-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-taxi font-display text-lg text-ink shadow-[0_6px_16px_-4px_rgba(11,11,11,0.35)] transition-transform duration-300 ease-out group-hover:scale-110">
                {r.name.charAt(0)}
              </span>
              <div>
                <div className="font-bold">{r.name}</div>
                <div className="text-xs text-ink-muted">{r.trip}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Riders can add their own story from here. */}
      <div className="mt-12 flex flex-col items-center gap-3 text-center">
        <a
          href={whatsappReviewLink()}
          target="_blank"
          rel="noreferrer"
          className="btn-taxi"
        >
          <Chat className="h-4 w-4" /> Write a Review
        </a>
        <p className="text-xs text-ink-muted">
          Travelled with us? Send your review on WhatsApp — it takes a minute.
        </p>
      </div>
    </section>
  );
}
