import { premiumCabs } from "@/data/site";

/** A one-way drop is priced higher per km, because the return leg runs empty. */
export type TripKind = "One Way" | "Round Trip" | string;

/** The two per-km rates every vehicle carries. */
export type Rates = { rateOneWay: number; rateRoundTrip: number };

/** Which rate applies to this trip type. */
export function rateFor(rates: Rates, trip: TripKind): number {
  return trip === "Round Trip" ? rates.rateRoundTrip : rates.rateOneWay;
}

/**
 * All-inclusive fare, rounded to ₹10 with a ₹500 floor.
 *
 * A round trip bills the total distance of both legs, so the one-way distance
 * is doubled — at the lower round-trip rate.
 */
export function computeFare(km: number, rates: Rates, trip: TripKind): number {
  const legs = trip === "Round Trip" ? 2 : 1;
  const raw = km * legs * rateFor(rates, trip);
  return Math.max(500, Math.round(raw / 10) * 10);
}

/** Shape the quote page renders, whether rates came from the DB or the fallback. */
export type FareOption = {
  id: string;
  name: string;
  rateOneWay: number;
  rateRoundTrip: number;
  seats: number;
  /** The rate actually used for this quote — what the customer is being charged. */
  appliedRate: number;
  fare: number;
};

/**
 * Estimated fare per vehicle for a given distance.
 *
 * `rates` comes from /api/vehicles when Supabase is reachable, so an admin
 * changing a rate updates the site immediately. Without it we fall back to the
 * static list in src/data/site.ts and the page still works.
 */
export function quoteFares(
  km: number,
  trip: TripKind,
  rates?: (Rates & { id: string; name: string; seats: number })[]
): FareOption[] {
  const source =
    rates?.length
      ? rates
      : premiumCabs.map((v) => ({
          id: v.id,
          name: v.name,
          rateOneWay: v.rateOneWay,
          rateRoundTrip: v.rateRoundTrip,
          seats: v.seats,
        }));

  return source.map((v) => ({
    ...v,
    appliedRate: rateFor(v, trip),
    fare: computeFare(km, v, trip),
  }));
}
