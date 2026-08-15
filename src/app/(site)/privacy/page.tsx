import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import LegalPage, { Clause, Points } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: `Privacy Policy — ${site.name}`,
  description: `What personal information ${site.name} collects when you book a cab, why we collect it, and how it is protected.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy"
      highlight="Policy"
      intro={`We ask for as little as a booking needs, and we do not sell it. This page sets out exactly what we collect, why, and what you can ask us to do with it.`}
    >
      <Clause n={1} title="What we collect">
        <p>When you book a cab or send an enquiry, we collect:</p>
        <Points
          items={[
            <>
              <strong>Your name and mobile number</strong> — so the driver and our
              office can reach you.
            </>,
            <>
              <strong>Email address</strong> — optional, used for confirmations.
            </>,
            <>
              <strong>Trip details</strong> — pickup and drop locations, date,
              time, vehicle type, and any note you add.
            </>,
            <>
              <strong>Payment records</strong> — the amount, status and reference
              ID of a transaction.
            </>,
          ]}
        />
        <p>
          We do <strong>not</strong> collect or store your card number, CVV, UPI
          PIN or bank credentials. Online payments are handled entirely by our
          payment gateway on their own systems; we only ever see whether a payment
          succeeded and its reference number.
        </p>
        <p>
          We do not track your live location. Pickup and drop points are only what
          you type in yourself.
        </p>
      </Clause>

      <Clause n={2} title="Why we collect it">
        <Points
          items={[
            "To confirm, schedule and operate your trip",
            "To let your driver contact you and find the pickup point",
            "To process payments and refunds",
            "To respond to your enquiries and support requests",
            "To keep records we are required to keep by law, including tax records",
          ]}
        />
        <p>
          We do not use your details for automated profiling, and we do not send
          marketing messages unless you have asked for them.
        </p>
      </Clause>

      <Clause n={3} title="Who we share it with">
        <p>We share the minimum necessary, and only with:</p>
        <Points
          items={[
            <>
              <strong>Your assigned driver</strong> — your name, mobile number and
              pickup/drop points. Nothing else.
            </>,
            <>
              <strong>Our payment gateway</strong> — to take payment and issue
              refunds.
            </>,
            <>
              <strong>Our hosting and database providers</strong> — who store the
              data on our behalf under their own security obligations.
            </>,
            <>
              <strong>Authorities</strong> — where we are legally required to
              disclose.
            </>,
          ]}
        />
        <p>
          <strong>We never sell your personal information</strong>, and we do not
          share it with advertisers or data brokers.
        </p>
      </Clause>

      <Clause n={4} title="Third-party services we use">
        <p>
          To show you a route and a fare, this site sends the pickup and drop
          places you type to mapping services (OpenStreetMap&apos;s Nominatim for
          address suggestions and OSRM for road distance). These receive the place
          names and coordinates only — not your name, number or booking.
        </p>
        <p>
          If you continue a booking on WhatsApp, that conversation is governed by
          WhatsApp&apos;s own privacy policy, not this one.
        </p>
      </Clause>

      <Clause n={5} title="How long we keep it">
        <p>
          Booking and payment records are kept for as long as we need them to run
          the business and to meet tax and accounting obligations under Indian law
          — normally <strong>eight years</strong>. Enquiries that never become
          bookings are kept for up to two years and then deleted.
        </p>
      </Clause>

      <Clause n={6} title="How it is protected">
        <Points
          items={[
            "All traffic between your browser and our site is encrypted over HTTPS.",
            "Booking data is stored in an access-controlled database. Customer records are not publicly readable, and our booking and enquiry forms can write to it but cannot read anything back.",
            "Only authorised staff with individual accounts can view bookings, and access can be revoked at any time.",
            "Card and UPI credentials never reach our systems at all.",
          ]}
        />
        <p>
          No system is perfectly secure, but if a breach ever affected your
          personal information we would tell you and the relevant authority
          promptly.
        </p>
      </Clause>

      <Clause n={7} title="Cookies">
        <p>
          This site does not use advertising or tracking cookies. The only browser
          storage we use is what our staff portal needs to keep an administrator
          signed in. As a customer, you can browse and book without accepting any
          tracking.
        </p>
      </Clause>

      <Clause n={8} title="Your rights">
        <p>You can ask us at any time to:</p>
        <Points
          items={[
            "Tell you what personal information we hold about you",
            "Correct anything that is wrong",
            "Delete your details, where we are not required by law to keep them",
            "Stop sending you any non-essential messages",
          ]}
        />
        <p>
          Email <a href={`mailto:${site.email}`}>{site.email}</a> from the address
          you booked with, or message us from your registered mobile number, and we
          will respond within 30 days.
        </p>
      </Clause>

      <Clause n={9} title="Children">
        <p>
          Our service is not directed at children under 18, and we do not knowingly
          collect their information. Minors travelling with us must be accompanied
          by an adult who makes the booking.
        </p>
      </Clause>

      <Clause n={10} title="Changes and contact">
        <p>
          If we change this policy we will update the date at the top of this page.
          For any privacy question, or to raise a concern, contact:
        </p>
        <p>
          {site.name}
          <br />
          {site.address}
          <br />
          <a href={`mailto:${site.email}`}>{site.email}</a> ·{" "}
          <a href={`tel:${site.phoneRaw}`}>{site.phone}</a>
        </p>
        <p>
          See also our <Link href="/terms">Terms &amp; Conditions</Link> and{" "}
          <Link href="/refund-policy">Cancellation &amp; Refund Policy</Link>.
        </p>
      </Clause>
    </LegalPage>
  );
}
