import { routeGroups } from "@/data/site";
import { Pin } from "@/components/Icons";

const cities = Array.from(
  new Set(
    routeGroups.flatMap((group) => [
      group.from,
      ...group.routes
        .map((route) => route.split(/\s+to\s+/i)[1]?.trim())
        .filter(Boolean),
    ])
  )
).slice(0, 18);

export default function DriveStrip() {
  const row = [...cities, ...cities];

  return (
    <section className="overflow-hidden border-b border-ink/[0.08] bg-white py-10 sm:py-12">
      <div className="wrap">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-ink-muted">
          <span className="text-ink">Drive To Your</span>{" "}
          <span className="text-taxi">Favorite Spot</span>
        </p>
      </div>

      <div
        className="mt-7 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="marquee-track marquee-hoverable animate-marquee">
          {row.map((city, index) => (
            <span
              key={`${city}-${index}`}
              className="mx-2.5 inline-flex h-14 shrink-0 items-center gap-3 rounded-full border border-ink/[0.1] bg-white px-8 text-base font-semibold text-ink shadow-[var(--shadow-card)] sm:text-lg"
            >
              <Pin className="h-5 w-5 text-taxi" />
              {city}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
