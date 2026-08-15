import { policyUpdated } from "@/data/legal";

/**
 * Shared shell for Terms / Privacy / Refund.
 *
 * Policy pages are read, not skimmed, so this deliberately drops the site's
 * animation and keeps a single narrow measure for legibility.
 */
export default function LegalPage({
  eyebrow,
  title,
  highlight,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <section className="wrap py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="display t-display mt-3">
          {title} <span className="hi">{highlight}</span>
        </h1>
        <p className="mt-5 text-base leading-relaxed text-ink-muted">{intro}</p>
        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-ink-muted">
          Last updated: {policyUpdated}
        </p>

        <div className="mt-12 space-y-10">{children}</div>
      </div>
    </section>
  );
}

export function Clause({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="card-title-lg flex items-baseline gap-3 text-xl">
        <span className="num-taxi text-lg">{String(n).padStart(2, "0")}</span>
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-muted [&_a]:font-semibold [&_a]:text-ink [&_a:hover]:text-taxi-deep [&_strong]:text-ink">
        {children}
      </div>
    </section>
  );
}

/** Bulleted list with the site's yellow markers. */
export function Points({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span
            aria-hidden
            className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-[2px] bg-taxi"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
