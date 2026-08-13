import { site } from "@/data/site";

/** Pre-typed booking message addressed to the YantraCabs WhatsApp number. */
export function whatsappBookingLink(d: {
  from: string;
  to: string;
  date: string;
  time: string;
  trip: string;
  km: number;
  vehicle: string;
  fare: number;
  /** Present once the booking is saved, so office staff can find it in admin. */
  bookingCode?: string;
  customerName?: string;
}) {
  const lines = [
    d.bookingCode ? `Booking ${d.bookingCode} — YantraCabs` : "New Cab Booking — YantraCabs",
    d.customerName ? `Name: ${d.customerName}` : null,
    `Pickup: ${d.from}`,
    `Drop: ${d.to}`,
    `Date: ${d.date || "—"}  Time: ${d.time || "—"}`,
    `Trip: ${d.trip}`,
    `Distance: ${d.km} km`,
    `Vehicle: ${d.vehicle}`,
    `Estimated Fare: ₹${d.fare.toLocaleString("en-IN")} (all-inclusive)`,
  ].filter(Boolean);

  return `${site.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
}
