import { site } from "@/data/site";

/** Pre-typed booking message addressed to the KoboCabs WhatsApp number. */
export function whatsappBookingLink(d: {
  from: string;
  to: string;
  date: string;
  time: string;
  trip: string;
  km: number;
  vehicle: string;
  fare: number;
}) {
  const msg =
`New Cab Booking — KoboCabs
Pickup: ${d.from}
Drop: ${d.to}
Date: ${d.date || "—"}  Time: ${d.time || "—"}
Trip: ${d.trip}
Distance: ${d.km} km
Vehicle: ${d.vehicle}
Estimated Fare: ₹${d.fare.toLocaleString("en-IN")} (all-inclusive)`;
  return `${site.whatsapp}?text=${encodeURIComponent(msg)}`;
}
