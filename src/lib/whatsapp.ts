import { fareNote, site } from "@/data/site";

/** Pre-typed booking message addressed to the YantraCabs WhatsApp number. */
export function whatsappBookingLink(d: {
  from: string;
  to: string;
  date: string;
  time: string;
  trip: string;
  km: number;
  vehicle: string;
  /** null when this direction is quoted on request. */
  fare: number | null;
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
    d.fare === null
      ? "Estimated Fare: on request — please share a rate for this route"
      : `Estimated Fare: ₹${d.fare.toLocaleString("en-IN")}`,
    "",
    fareNote.whatsapp,
  ].filter((line) => line !== null);

  return `${site.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
}

/**
 * Pre-typed review message, so the rider only has to fill in their experience.
 * Reviews come in on WhatsApp like every other enquiry on this site.
 */
export function whatsappReviewLink() {
  const msg = `Hi ${site.name}, I'd like to leave a review.

Name:
Trip (from → to):
Rating (out of 5):
My experience:`;
  return `${site.whatsapp}?text=${encodeURIComponent(msg)}`;
}
