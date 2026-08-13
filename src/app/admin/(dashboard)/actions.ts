"use server";

import { revalidatePath } from "next/cache";
import { adminDb } from "@/lib/admin-auth";
import { normalisePhone, str } from "@/lib/validate";

/**
 * Server actions for the admin portal.
 *
 * Every one of these starts with adminDb(), which runs requireAdmin() first.
 * Server actions are individually callable HTTP endpoints — the layout's guard
 * does not cover them, so the check has to be here.
 */

type ActionResult = { ok: true } | { ok: false; error: string };

const BOOKING_STATUSES = ["pending", "confirmed", "assigned", "completed", "cancelled"];
const PAYMENT_STATUSES = ["unpaid", "advance_paid", "paid", "refunded", "failed"];
const ENQUIRY_STATUSES = ["new", "contacted", "converted", "closed"];

function fail(error: string): ActionResult {
  return { ok: false, error };
}

// ---------- bookings ----------

export async function updateBooking(formData: FormData): Promise<ActionResult> {
  const id = str(formData.get("id"), 40);
  if (!id) return fail("Missing booking id.");

  const status = str(formData.get("status"), 20);
  const paymentStatus = str(formData.get("payment_status"), 20);
  const driverId = str(formData.get("driver_id"), 40);
  const adminNotes = str(formData.get("admin_notes"), 2000);

  if (status && !BOOKING_STATUSES.includes(status)) return fail("Unknown booking status.");
  if (paymentStatus && !PAYMENT_STATUSES.includes(paymentStatus)) {
    return fail("Unknown payment status.");
  }

  const patch: Record<string, unknown> = {
    admin_notes: adminNotes || null,
    driver_id: driverId || null,
  };
  if (status) patch.status = status;
  if (paymentStatus) patch.payment_status = paymentStatus;

  const db = await adminDb();
  const { error } = await db.from("bookings").update(patch).eq("id", id);
  if (error) return fail(error.message);

  revalidatePath("/admin");
  revalidatePath("/admin/bookings");
  revalidatePath(`/admin/bookings/${id}`);
  return { ok: true };
}

export async function setBookingStatus(formData: FormData): Promise<ActionResult> {
  const id = str(formData.get("id"), 40);
  const status = str(formData.get("status"), 20);
  if (!id || !BOOKING_STATUSES.includes(status)) return fail("Invalid request.");

  const db = await adminDb();
  const { error } = await db.from("bookings").update({ status }).eq("id", id);
  if (error) return fail(error.message);

  revalidatePath("/admin");
  revalidatePath("/admin/bookings");
  revalidatePath(`/admin/bookings/${id}`);
  return { ok: true };
}

// ---------- enquiries ----------

export async function setEnquiryStatus(formData: FormData): Promise<ActionResult> {
  const id = str(formData.get("id"), 40);
  const status = str(formData.get("status"), 20);
  if (!id || !ENQUIRY_STATUSES.includes(status)) return fail("Invalid request.");

  const db = await adminDb();
  const { error } = await db.from("enquiries").update({ status }).eq("id", id);
  if (error) return fail(error.message);

  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
  return { ok: true };
}

// ---------- vehicles / rates ----------

export async function updateVehicle(formData: FormData): Promise<ActionResult> {
  const id = str(formData.get("id"), 40);
  if (!id) return fail("Missing vehicle id.");

  const rate = Number(formData.get("rate_per_km"));
  if (!Number.isFinite(rate) || rate <= 0) return fail("Rate must be a number above zero.");
  if (rate > 1000) return fail("That rate looks wrong — please check before saving.");

  const seats = Number(formData.get("seats"));
  if (!Number.isInteger(seats) || seats < 1 || seats > 60) return fail("Invalid seat count.");

  const db = await adminDb();
  const { error } = await db
    .from("vehicles")
    .update({
      rate_per_km: rate,
      seats,
      name: str(formData.get("name"), 80) || undefined,
      active: formData.get("active") === "on",
    })
    .eq("id", id);
  if (error) return fail(error.message);

  revalidatePath("/admin/vehicles");
  return { ok: true };
}

// ---------- drivers ----------

export async function saveDriver(formData: FormData): Promise<ActionResult> {
  const id = str(formData.get("id"), 40);
  const name = str(formData.get("name"), 120);
  if (name.length < 2) return fail("Driver name is required.");

  const phone = normalisePhone(formData.get("phone"));
  if (!phone) return fail("Enter a valid 10-digit mobile number.");

  const row = {
    name,
    phone,
    license_no: str(formData.get("license_no"), 40) || null,
    vehicle_no: str(formData.get("vehicle_no"), 20).toUpperCase() || null,
    notes: str(formData.get("notes"), 1000) || null,
    active: formData.get("active") === "on",
  };

  const db = await adminDb();
  const { error } = id
    ? await db.from("drivers").update(row).eq("id", id)
    : await db.from("drivers").insert(row);
  if (error) return fail(error.message);

  revalidatePath("/admin/drivers");
  return { ok: true };
}
