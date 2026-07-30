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

const LOCAL_PLACES: Place[] = [
  { label: "New Delhi, Delhi, India", lat: 28.613939, lon: 77.209023 },
  { label: "Delhi, India", lat: 28.704060, lon: 77.102493 },
  { label: "Noida, Uttar Pradesh, India", lat: 28.535517, lon: 77.391029 },
  { label: "Gurgaon, Haryana, India", lat: 28.459497, lon: 77.026638 },
  { label: "Bareilly, Uttar Pradesh, India", lat: 28.367031, lon: 79.430436 },
  { label: "Lucknow, Uttar Pradesh, India", lat: 26.846708, lon: 80.946159 },
  { label: "Agra, Uttar Pradesh, India", lat: 27.176670, lon: 78.008074 },
  { label: "Jaipur, Rajasthan, India", lat: 26.912434, lon: 75.787271 },
  { label: "Nainital, Uttarakhand, India", lat: 29.391910, lon: 79.454210 },
  { label: "Mussoorie, Uttarakhand, India", lat: 30.4590, lon: 78.0667 },
  { label: "Haridwar, Uttarakhand, India", lat: 29.9457, lon: 78.1642 },
  { label: "Rishikesh, Uttarakhand, India", lat: 30.0869, lon: 78.2676 },
  { label: "Dehradun, Uttarakhand, India", lat: 30.3165, lon: 78.0322 },
  { label: "Varanasi, Uttar Pradesh, India", lat: 25.3176, lon: 82.9739 },
  { label: "Chandigarh, India", lat: 30.7333, lon: 76.7794 },
  { label: "Amritsar, Punjab, India", lat: 31.6340, lon: 74.8723 },
  { label: "Mathura, Uttar Pradesh, India", lat: 27.4924, lon: 77.6737 },
  { label: "Ayodhya, Uttar Pradesh, India", lat: 26.7950, lon: 82.1945 },
  { label: "Prayagraj, Uttar Pradesh, India", lat: 25.4358, lon: 81.8463 },
  { label: "Moradabad, Uttar Pradesh, India", lat: 28.8380, lon: 78.7736 },
];

function localSuggestions(text: string): Place[] {
  const query = text.trim().toLowerCase();
  if (query.length < 2) return [];
  return LOCAL_PLACES.filter((place) => place.label.toLowerCase().includes(query)).slice(0, 6);
}

/** Live address suggestions. Returns [] on any failure — never throws. */
export async function autocomplete(text: string): Promise<Place[]> {
  const cleaned = text.trim();
  if (!cleaned) return [];

  const local = localSuggestions(cleaned);
  if (cleaned.length < 3) return local;

  const url =
    `https://nominatim.openstreetmap.org/search` +
    `?q=${encodeURIComponent(text)}` +
    `&format=json&countrycodes=in&limit=6&addressdetails=1`;
  try {
    const res = await fetch(url, { headers: { "Accept-Language": "en" } });
    if (!res.ok) return local;
    const data = (await res.json()) as { display_name: string; lat: string; lon: string }[];
    const remote = data.map((r) => ({
      label: r.display_name,
      lat: parseFloat(r.lat),
      lon: parseFloat(r.lon),
    }));
    return [
      ...local,
      ...remote.filter((place) => !local.some((existing) => existing.label === place.label)),
    ].slice(0, 6);
  } catch {
    return local;
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
