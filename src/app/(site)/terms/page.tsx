import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { advanceAmount } from "@/data/legal";
import LegalPage, { Clause, Points } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: `Terms & Conditions — ${site.name}`,
  description: `The terms that apply when you book a cab with ${site.name}.`,
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms &"
      highlight="Conditions"
      intro={`These terms apply whenever you book a cab with ${site.name}, whether through this website, WhatsApp, or over the phone. Booking with us means you accept them.`}
    >
      <Clause n={1} title="Who we are">
        <p>
          {site.name} is a cab booking service operating out of {site.city},
          serving outstation and city routes across North India since {site.since}.
        </p>
        <p>
          Registered address: {site.address}. You can reach us on{" "}
          <a href={`tel:${site.phoneRaw}`}>{site.phone}</a> or{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> during {site.hours}.
        </p>
      </Clause>

      <Clause n={2} title="Booking and confirmation">
        <p>
          Submitting a booking on this site is a <strong>request</strong>, not a
          confirmed trip. A booking is confirmed only once we acknowledge it on
          WhatsApp, by call, or by email, and you receive a booking code.
        </p>
        <p>
          You must give accurate pickup and drop details, a working mobile number,
          and correct passenger and luggage counts. We may decline or cancel a
          booking if the details turn out to be wrong, if the vehicle requested
          cannot carry the group, or if the route is unsafe or unserviceable at
          that time.
        </p>
      </Clause>

      <Clause n={3} title="Fares and what they include">
        <p>
          Fares shown during booking are calculated from the road distance for
          your route and the per-kilometre rate for the vehicle you choose. Round
          trips are billed for both legs.
        </p>
        <p>A quoted fare covers:</p>
        <Points
          items={[
            "Fuel and vehicle running costs",
            "GST",
          ]}
        />
        <p>The following are <strong>not</strong> included and are payable by you:</p>
        <Points
          items={[
            "Toll charges along the route",
            "Driver allowance, including night charges where applicable",
            "State entry permits, paid at the booth",
            "Parking charges at your destination",
            "Any extra kilometres beyond the booked route",
            "Waiting beyond the free waiting period in clause 5",
          ]}
        />
        <p>
          A fare shown on screen is an <strong>estimate for the route as booked</strong>.
          If the actual trip changes — extra stops, a different drop point, a
          longer route at your request — the fare is recalculated at the same
          per-kilometre rate and the difference is payable to the driver.
        </p>
        <p>
          Where live routing is unavailable, distance may be shown as an
          approximate estimate. We label these clearly and confirm the final fare
          with you before dispatch.
        </p>
      </Clause>

      <Clause n={4} title="Payment">
        <p>
          Bookings made online are confirmed with a{" "}
          <strong>₹{advanceAmount} advance</strong>. The balance is paid directly
          to your driver at the end of the trip, by cash or UPI.
        </p>
        <p>
          Please collect a receipt from the driver for the balance. Cancellations
          and refunds of the advance are covered in our{" "}
          <Link href="/refund-policy">Cancellation &amp; Refund Policy</Link>.
        </p>
      </Clause>

      <Clause n={5} title="Pickup, waiting and delays">
        <p>
          Please be ready at the booked pickup time. Drivers wait{" "}
          <strong>45 minutes free</strong> for outstation pickups and{" "}
          <strong>15 minutes free</strong> for local trips. Beyond that, waiting
          charges apply, and a booking may be treated as a no-show.
        </p>
        <p>
          We plan journeys carefully but cannot guarantee arrival times. Traffic,
          weather, road conditions, diversions and breakdowns can all cause delays.
          We are not liable for missed flights, trains or connections, so please
          allow a comfortable buffer when booking an airport or station transfer.
        </p>
      </Clause>

      <Clause n={6} title="Conduct during the journey">
        <Points
          items={[
            "Smoking, alcohol and illegal substances are not permitted in our vehicles.",
            "Seat belts must be worn by all passengers.",
            "Passenger and luggage counts must not exceed the vehicle's capacity.",
            "Any damage to the vehicle caused by passengers is chargeable at actuals.",
            "Drivers may end a trip if passenger behaviour is unsafe, abusive, or unlawful. No refund is due in that case.",
          ]}
        />
        <p>
          Please carry a valid government photo ID. Some routes and checkposts
          require it.
        </p>
      </Clause>

      <Clause n={7} title="Luggage and belongings">
        <p>
          Luggage capacity depends on the vehicle. Tell us about oversized items
          when booking so we can send something suitable.
        </p>
        <p>
          We are not responsible for belongings left behind in a vehicle. If you
          do leave something, contact us immediately and we will do our best to
          recover it, but we cannot guarantee it.
        </p>
      </Clause>

      <Clause n={8} title="Liability">
        <p>
          All our vehicles carry valid insurance and permits, and our drivers hold
          valid commercial licences. Beyond what that insurance covers, our
          liability for any booking is limited to the fare paid for that booking.
        </p>
        <p>
          We are not liable for indirect or consequential losses, including missed
          events, bookings or connections, or for delays and cancellations caused
          by events outside our reasonable control.
        </p>
      </Clause>

      <Clause n={9} title="Your information">
        <p>
          We collect only what a booking needs — your name, mobile number, email
          if you give one, and trip details. How we handle it is set out in our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </Clause>

      <Clause n={10} title="Changes to these terms">
        <p>
          We may update these terms as our service changes. The version published
          on this page at the time of your booking is the one that applies to it,
          so the &ldquo;last updated&rdquo; date above matters.
        </p>
      </Clause>

      <Clause n={11} title="Governing law">
        <p>
          These terms are governed by the laws of India. Any dispute is subject to
          the exclusive jurisdiction of the courts of {site.city}.
        </p>
      </Clause>

      <Clause n={12} title="Contact">
        <p>
          Questions about these terms? Write to{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>, call{" "}
          <a href={`tel:${site.phoneRaw}`}>{site.phone}</a>, or message us on{" "}
          <a href={site.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          .
        </p>
      </Clause>
    </LegalPage>
  );
}
