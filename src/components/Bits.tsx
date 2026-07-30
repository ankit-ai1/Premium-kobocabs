import type { ReactNode } from "react";

/** Small eyebrow + big display heading with a highlighted tail word. */
export function SectionHead({
  eyebrow,
  title,
  hi,
  sub,
  center,
  light,
}: {
  eyebrow?: string;
  title: string;
  hi?: string;
  sub?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      {eyebrow && (
        <span className={`eyebrow ${light ? "text-white/70" : ""}`}>{eyebrow}</span>
      )}
      <h2 className={`display t-h2 mt-3 ${light ? "text-white" : "text-ink"}`}>
        {title} {hi && <span className="hi">{hi}</span>}
      </h2>
      {sub && (
        <p
          className={`mt-4 text-[0.975rem] leading-relaxed ${
            light ? "text-white/65" : "text-ink-muted"
          }`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

/** Top-of-page banner used on inner pages. */
export function PageHero({
  eyebrow,
  title,
  hi,
  sub,
  children,
}: {
  eyebrow: string;
  title: string;
  hi: string;
  sub: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-ink/[0.08] bg-paper">
      {/* Soft yellow bloom so the banner isn't a flat block. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-40 h-[420px] w-[420px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,206,0,0.35) 0%, rgba(255,206,0,0) 70%)",
        }}
      />
      <div className="wrap relative py-16 sm:py-20">
        <span className="inline-flex items-center rounded-full bg-taxi px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-ink">
          {eyebrow}
        </span>
        <h1 className="display t-display mt-5">
          {title} <span className="hi">{hi}</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">{sub}</p>
        {children}
      </div>
    </section>
  );
}
