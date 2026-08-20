import { premiumCabs } from "@/data/site";

/** A one-way drop is priced higher per km, because the return leg runs empty. */
export type TripKind = "One Way" | "Round Trip" | string;

/**
 * The per-km rates a vehicle carries.
 *
 * `rateOneWay` is null when that direction is quoted on request — the Tempo
 * Traveller, whose one-way price depends on the route.
 */
export type Rates = { rateOneWay: number | null; rateRoundTrip: number };

/** Which rate applies to this trip, or null when it is quoted on request. */
export function rateFor(rates: Rates, trip: TripKind): number | null {
  return trip === "Round Trip" ? rates.rateRoundTrip : rates.rateOneWay;
}

/**
 * Estimated fare, rounded to ₹10 with a ₹500 floor.
 *
 * A round trip bills the total distance of both legs, so the one-way distance
 * is doubled — at the lower round-trip rate.
 *
 * Returns null when the applicable rate is quoted on request, so callers show
 * "call for rate" rather than inventing a number.
 */
export function computeFare(km: number, rates: Rates, trip: TripKind): number | null {
  const rate = rateFor(rates, trip);
  if (rate === null) return null;

  const legs = trip === "Round Trip" ? 2 : 1;
  return Math.max(500, Math.round((km * legs * rate) / 10) * 10);
}

/** Shape the quote page renders, whether rates came from the DB or the fallback. */
export type FareOption = {
  id: string;
  name: string;
  rateOneWay: number | null;
  rateRoundTrip: number;
  seats: number;
  /** The rate used for this quote, or null when quoted on request. */
  appliedRate: number | null;
  /** null means no card price exists for this direction — ask us. */
  fare: number | null;
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
