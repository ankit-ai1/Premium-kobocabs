import { premiumCabs } from "@/data/site";

/**
 * Estimated all-inclusive fare per vehicle for a given distance.
 * Round trips bill both legs; every quote is rounded to ₹10 with a ₹500 floor.
 */
export function quoteFares(km: number, trip: string) {
  const multiplier = trip === "Round Trip" ? 2 : 1;
  return premiumCabs.map((v) => {
    const raw = km * v.ratePerKm * multiplier;
    const fare = Math.max(500, Math.round(raw / 10) * 10);
    return { ...v, fare };
  });
}
