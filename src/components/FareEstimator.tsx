"use client";

import { useState } from "react";
import { premiumCabs } from "@/data/site";
import { SectionHead } from "./Bits";

export default function FareEstimator() {
  const [km, setKm] = useState(250);

  return (
    <section className="wrap py-20">
      <SectionHead
        center
        eyebrow="Estimate"
        title="What Will My"
        hi="Trip Cost?"
        sub="Move the slider to see all-inclusive one-way fares across every premium cab."
      />

      <div className="card mx-auto mt-12 max-w-4xl p-6 sm:p-8">
        <div className="flex items-end justify-between">
          <span className="text-[11px] font-bold uppercase tracking-widest text-ink-muted">
            One-way distance
          </span>
          <span className="num-taxi text-4xl">
            {km}
            <span className="ml-1 text-lg text-ink [text-shadow:none]">km</span>
          </span>
        </div>

        <input
          type="range"
          min={50}
          max={3000}
          step={10}
          value={km}
          onChange={(e) => setKm(Number(e.target.value))}
          className="slider-taxi mt-5"
          // Fills the track up to the thumb.
          style={{ ["--fill" as string]: `${((km - 50) / 2950) * 100}%` }}
        />
        <div className="mt-2 flex justify-between text-[11px] font-semibold text-ink-muted">
          <span>50 km</span>
          <span>3,000 km</span>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {premiumCabs.map((c) => (
            <div
              key={c.id}
              className="rounded-xl border border-ink/[0.08] bg-paper/70 p-4 text-center transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-taxi/50 hover:bg-white"
            >
              <div className="text-[11px] font-bold uppercase tracking-widest text-ink-muted">
                {c.name}
              </div>
              <div className="mt-2 font-display text-3xl tracking-wide">
                ₹{(km * c.ratePerKm).toLocaleString("en-IN")}
              </div>
              <div className="mt-1 text-[11px] text-ink-muted">
                ₹{c.ratePerKm}/km · {c.seats} seats
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-ink-muted">
          Estimates include driver allowance, toll and GST. State entry permits on
          outstation routes are paid at the booth.
        </p>
      </div>
    </section>
  );
}
