/**
 * Absolute base URL for the site.
 *
 * Sitemap entries, robots.txt and Open Graph image URLs all have to be
 * absolute, so this has to resolve to a real origin at build time.
 *
 * Order matters:
 *   1. NEXT_PUBLIC_SITE_URL — set this once the real domain is live. Always wins.
 *   2. VERCEL_PROJECT_PRODUCTION_URL — Vercel's stable production domain. Note
 *      this is NOT the same as VERCEL_URL, which changes on every deployment
 *      and would put preview URLs in the sitemap.
 *   3. localhost, for development.
 */
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return stripTrailingSlash(explicit);

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${stripTrailingSlash(vercel)}`;

  return "http://localhost:3000";
}

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}
