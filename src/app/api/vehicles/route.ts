import { createAdminClient } from "@/lib/supabase/admin";
import type { Vehicle } from "@/lib/supabase/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Live fare card for the public site.
 *
 * Returns [] rather than an error when Supabase is unreachable or unconfigured
 * — callers fall back to the static list in src/data/site.ts, so the booking
 * flow keeps working during a DB outage.
 */
export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select("slug, name, rate_per_km, seats, image_url")
      .eq("active", true)
      .order("sort_order", { ascending: true })
      .returns<Pick<Vehicle, "slug" | "name" | "rate_per_km" | "seats" | "image_url">[]>();

    if (error) throw error;

    return Response.json(
      {
        vehicles: (data ?? []).map((v) => ({
          id: v.slug,
          name: v.name,
          ratePerKm: Number(v.rate_per_km),
          seats: v.seats,
          image: v.image_url,
        })),
      },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } }
    );
  } catch (err) {
    console.error("[api/vehicles]", err);
    return Response.json({ vehicles: [] });
  }
}
