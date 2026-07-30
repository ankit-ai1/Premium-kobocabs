// ============================================================
//  Geocoding + routing — entirely keyless.
//
//  Every third-party call the booking flow makes lives in this file, so
//  swapping to a keyed/self-hosted provider later means editing only here.
//
//  Services used (all free, no signup, no env vars):
//    • Nominatim (OpenStreetMap) — address autocomplete
//    • OSRM public demo          — road distance + route geometry
//    • Haversine × 1.3           — offline fallback, so a distance always returns
//
//  These are shared public services with fair-use limits. Callers must debounce
//  autocomplete to 500ms and require >= 3 characters.
// ============================================================

export type Place = { label: string; lat: number; lon: number };

/** Live address suggestions. Returns [] on any failure — never throws. */
export async function autocomplete(text: string): Promise<Place[]> {
  if (text.trim().length < 3) return [];
  const url =
    `https://nominatim.openstreetmap.org/search` +
    `?q=${encodeURIComponent(text)}` +
    `&format=json&countrycodes=in&limit=6&addressdetails=1`;
  try {
    const res = await fetch(url, { headers: { "Accept-Language": "en" } });
    if (!res.ok) return [];
    const data = (await res.json()) as { display_name: string; lat: string; lon: string }[];
    return data.map((r) => ({
      label: r.display_name,
      lat: parseFloat(r.lat),
      lon: parseFloat(r.lon),
    }));
  } catch {
    return [];
  }
}

function haversineKm(a: Place, b: Place): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lon - a.lon) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

function readableDuration(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h ? `${h} hr ${m} min` : `${m} min`;
}

export type RouteResult = {
  distanceKm: number;
  durationText: string;
  /** [lat, lon] pairs for the map polyline. */
  coordinates: [number, number][];
  /** true when OSRM was unreachable and this is a straight-line estimate. */
  approximate: boolean;
};

/**
 * Real driving distance via OSRM, falling back to a straight-line estimate.
 * Always resolves — the booking flow must never dead-end on a network error.
 */
export async function getRoute(from: Place, to: Place): Promise<RouteResult> {
  const straight: [number, number][] = [
    [from.lat, from.lon],
    [to.lat, to.lon],
  ];

  try {
    const url =
      `https://router.project-osrm.org/route/v1/driving/` +
      `${from.lon},${from.lat};${to.lon},${to.lat}` +
      `?overview=full&geometries=geojson`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      const r = data.routes?.[0];
      if (r) {
        const coords: [number, number][] = (r.geometry.coordinates as number[][]).map(
          ([lon, lat]) => [lat, lon] as [number, number]
        );
        return {
          distanceKm: Math.max(1, Math.round(r.distance / 1000)),
          durationText: readableDuration(Math.round(r.duration / 60)),
          coordinates: coords.length ? coords : straight,
          approximate: false,
        };
      }
    }
  } catch {
    /* fall through to the offline estimate */
  }

  const km = Math.max(1, Math.round(haversineKm(from, to) * 1.3));
  return {
    distanceKm: km,
    durationText: readableDuration(Math.round((km / 45) * 60)), // ~45 km/h
    coordinates: straight,
    approximate: true,
  };
}
