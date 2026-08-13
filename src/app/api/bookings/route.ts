import { createAdminClient } from "@/lib/supabase/admin";
import { computeFare } from "@/lib/fare";
import { getRoute } from "@/lib/geo";
import type { Vehicle } from "@/lib/supabase/types";
import {
  isCoord,
  isEmail,
  isoDate,
  jsonError,
  normalisePhone,
  num,
  str,
} from "@/lib/validate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Create a booking.
 *
 * The browser sends *what the trip is*, never what it costs. Distance is
 * re-routed here and the rate is read from the vehicles table, so the stored
 * `fare_total` cannot be tampered with — which is the precondition for wiring
 * Razorpay to this same endpoint later.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON body.");
  }

  // ---- customer ----
  const customerName = str(body.customerName, 120);
  if (customerName.length < 2) return jsonError("Please enter your name.");

  const phone = normalisePhone(body.phone);
  if (!phone) return jsonError("Please enter a valid 10-digit mobile number.");

  const emailRaw = str(body.email, 160);
  if (emailRaw && !isEmail(emailRaw)) return jsonError("Please enter a valid email address.");

  // ---- trip ----
  const from = (body.from ?? {}) as Record<string, unknown>;
  const to = (body.to ?? {}) as Record<string, unknown>;

  const fromLabel = str(from.label, 300);
  const toLabel = str(to.label, 300);
  if (!fromLabel || !toLabel) return jsonError("Pickup and drop are both required.");

  const fromLat = num(from.lat);
  const fromLon = num(from.lon);
  const toLat = num(to.lat);
  const toLon = num(to.lon);
  if (!isCoord(fromLat, fromLon) || !isCoord(toLat, toLon)) {
    return jsonError("Pick both locations from the suggestions so we can map the route.");
  }

  const tripType = str(body.tripType, 20) === "Round Trip" ? "Round Trip" : "One Way";
  const pickupDate = isoDate(body.date);
  const pickupTime = str(body.time, 10);
  const customerNote = str(body.note, 1000);

  const vehicleSlug = str(body.vehicleSlug, 60);
  if (!vehicleSlug) return jsonError("Please choose a cab.");

  try {
    const supabase = createAdminClient();

    // Rate comes from the DB, never the request.
    const { data: vehicle, error: vehicleError } = await supabase
      .from("vehicles")
      .select("id, slug, name, rate_per_km")
      .eq("slug", vehicleSlug)
      .eq("active", true)
      .maybeSingle<Pick<Vehicle, "id" | "slug" | "name" | "rate_per_km">>();

    if (vehicleError) throw vehicleError;
    if (!vehicle) return jsonError("That cab is not available right now.", 404);

    // Distance re-derived server-side. getRoute never throws — it falls back to
    // a straight-line estimate, which we flag so admin knows to confirm it.
    const route = await getRoute(
      { label: fromLabel, lat: fromLat!, lon: fromLon! },
      { label: toLabel, lat: toLat!, lon: toLon! }
    );

    const ratePerKm = Number(vehicle.rate_per_km);
    const fareTotal = computeFare(route.distanceKm, ratePerKm, tripType);

    const { data: booking, error: insertError } = await supabase
      .from("bookings")
      .insert({
        customer_name: customerName,
        phone,
        email: emailRaw || null,
        from_label: fromLabel,
        from_lat: fromLat,
        from_lon: fromLon,
        to_label: toLabel,
        to_lat: toLat,
        to_lon: toLon,
        pickup_date: pickupDate,
        pickup_time: pickupTime || null,
        trip_type: tripType,
        distance_km: route.distanceKm,
        distance_is_estimate: route.approximate,
        vehicle_id: vehicle.id,
        vehicle_name: vehicle.name,
        rate_per_km: ratePerKm,
        fare_total: fareTotal,
        customer_note: customerNote || null,
        status: "pending",
        payment_status: "unpaid",
        source: "website",
      })
      .select("id, booking_code, fare_total, distance_km")
      .single<{
        id: string;
        booking_code: string;
        fare_total: number;
        distance_km: number;
      }>();

    if (insertError) throw insertError;

    return Response.json({
      bookingId: booking.id,
      bookingCode: booking.booking_code,
      fareTotal: Number(booking.fare_total),
      distanceKm: Number(booking.distance_km),
      vehicleName: vehicle.name,
      approximate: route.approximate,
    });
  } catch (err) {
    console.error("[api/bookings]", err);
    return jsonError("Could not save your booking. Please call or WhatsApp us instead.", 500);
  }
}
