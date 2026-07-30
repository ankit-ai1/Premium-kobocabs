"use client";

import { useCounter, useReveal } from "@/hooks/useGsap";

function Stat({
  end,
  suffix,
  label,
}: {
  end: number;
  suffix: string;
  label: string;
}) {
  const ref = useCounter(end, { suffix });
  return (
    <div data-reveal className="text-center">
      <div className="num-taxi text-5xl leading-none sm:text-6xl lg:text-7xl">
        <span ref={ref}>0</span>
      </div>
      <div className="mt-3 text-[11px] font-bold uppercase tracking-widest text-ink-muted">
        {label}
      </div>
    </div>
  );
}

export default function Stats() {
  const ref = useReveal<HTMLDivElement>("[data-reveal]", { stagger: 0.09, y: 34 });

  return (
    <section className="border-y border-ink/[0.08] bg-paper/60 py-16">
      <div ref={ref} className="wrap grid grid-cols-2 gap-10 lg:grid-cols-4">
        <Stat end={120} suffix="+" label="Premium Cabs" />
        <Stat end={50000} suffix="+" label="Rides Completed" />
        <Stat end={500} suffix="+" label="Routes Covered" />
        <Stat end={98} suffix="%" label="Satisfied Riders" />
      </div>
    </section>
  );
}
