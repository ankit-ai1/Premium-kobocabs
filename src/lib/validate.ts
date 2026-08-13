/** Small input guards for the public API routes. No dependency, no schema lib. */

export function str(value: unknown, max = 500): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function num(value: unknown): number | null {
  const n = typeof value === "number" ? value : parseFloat(String(value));
  return Number.isFinite(n) ? n : null;
}

/** Indian mobile: 10 digits starting 6-9, with an optional 91/+91 prefix. */
export function normalisePhone(input: unknown): string | null {
  const digits = str(input, 20).replace(/\D/g, "");
  const local = digits.length > 10 ? digits.slice(-10) : digits;
  return /^[6-9]\d{9}$/.test(local) ? local : null;
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

/** A latitude/longitude pair that is actually on the globe. */
export function isCoord(lat: number | null, lon: number | null): boolean {
  return (
    lat !== null &&
    lon !== null &&
    lat >= -90 &&
    lat <= 90 &&
    lon >= -180 &&
    lon <= 180
  );
}

/** ISO date (YYYY-MM-DD) or null. Rejects anything Postgres would choke on. */
export function isoDate(value: unknown): string | null {
  const s = str(value, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  return Number.isNaN(Date.parse(s)) ? null : s;
}

export function jsonError(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}
