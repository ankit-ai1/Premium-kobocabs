import { premiumCabs } from "@/data/site";

/** Round trips bill both legs; every quote rounds to ₹10 with a ₹500 floor. */
export function computeFare(km: number, ratePerKm: number, trip: string): number {
  const multiplier = trip === "Round Trip" ? 2 : 1;
  const raw = km * ratePerKm * multiplier;
  return Math.max(500, Math.round(raw / 10) * 10);
}

/** Shape the quote page renders, whether the rates came from the DB or the fallback. */
export type FareOption = {
  id: string;
  name: string;
  ratePerKm: number;
  seats: number;
  fare: number;
};

/**
 * Estimated all-inclusive fare per vehicle for a given distance.
 *
 * `rates` comes from /api/vehicles when Supabase is reachable, so an admin
 * changing a rate updates the site immediately. Without it we fall back to the
 * static list in src/data/site.ts and the page still works.
 */
export function quoteFares(
  km: number,
  trip: string,
  rates?: { id: string; name: string; ratePerKm: number; seats: number }[]
): FareOption[] {
  const source =
    rates?.length
      ? rates
      : premiumCabs.map((v) => ({
          id: v.id,
          name: v.name,
          ratePerKm: v.ratePerKm,
          seats: v.seats,
        }));

  return source.map((v) => ({ ...v, fare: computeFare(km, v.ratePerKm, trip) }));
}
