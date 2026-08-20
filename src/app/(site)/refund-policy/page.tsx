import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import {
  advanceAmount,
  cancellationTiers,
  refundProcessingDays,
} from "@/data/legal";
import LegalPage, { Clause, Points } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: `Cancellation & Refund Policy — ${site.name}`,
  description: `How cancellations and refunds work for ${site.name} cab bookings, including the advance payment and refund timelines.`,
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      eyebrow="Policy"
      title="Cancellation &"
      highlight="Refunds"
      intro={`Plans change — we get it. This page explains exactly what happens to your money when a booking is cancelled, so there are no surprises either way.`}
    >
      <Clause n={1} title="How payment works">
        <p>
          When you book online you pay a <strong>₹{advanceAmount} advance</strong> to
          confirm the trip. The remaining fare is paid directly to your driver at
          the end of the journey, by cash or UPI.
        </p>
        <p>
          Only the ₹{advanceAmount} advance is ever refundable, because it is the
          only amount we have collected. Fares quoted on our site are estimates
          based on distance; toll, driver allowance and state entry permits are
          not part of the fare and are payable separately.
        </p>
      </Clause>

      <Clause n={2} title="Cancellation charges">
        <p>
          What you get back depends on how close to your pickup time you cancel.
          The later it is, the less we can recover — a driver and vehicle have
          already been held for you.
        </p>

        <div className="overflow-x-auto">
          <table className="mt-2 w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-ink/[0.12] text-left text-[11px] uppercase tracking-widest text-ink-muted">
                <th className="py-3 pr-4 font-bold">When you cancel</th>
                <th className="py-3 pr-4 font-bold">You get back</th>
              </tr>
            </thead>
            <tbody>
              {cancellationTiers.map((tier) => (
                <tr key={tier.window} className="border-b border-ink/[0.06] last:border-0">
                  <td className="py-4 pr-4 align-top font-semibold text-ink">
                    {tier.window}
                  </td>
                  <td className="py-4 pr-4 align-top">
                    <div className="font-bold text-ink">{tier.refund}</div>
                    <div className="mt-1 text-xs">{tier.note}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Clause>

      <Clause n={3} title="If we cancel">
        <p>
          If we cannot provide a vehicle for any reason — breakdown, driver
          unavailability, or anything else on our side — you receive a{" "}
          <strong>full refund of your advance</strong>, regardless of timing. We
          will always try to arrange a replacement vehicle of the same or higher
          category first, at no extra cost to you.
        </p>
        <p>
          Trips cancelled because of events outside anyone&apos;s control — road
          closures, natural events, curfew, strikes, or government restrictions —
          are also refunded in full.
        </p>
      </Clause>

      <Clause n={4} title="How to cancel">
        <p>Cancel through whichever is easiest:</p>
        <Points
          items={[
            <>
              WhatsApp us at{" "}
              <a href={site.whatsapp} target="_blank" rel="noreferrer">
                {site.phone}
              </a>{" "}
              with your booking code
            </>,
            <>
              Call <a href={`tel:${site.phoneRaw}`}>{site.phone}</a> during{" "}
              {site.hours}
            </>,
            <>
              Email <a href={`mailto:${site.email}`}>{site.email}</a>
            </>,
          ]}
        />
        <p>
          Please quote the booking code from your confirmation (it looks like{" "}
          <strong>YC-2026-1234</strong>). Your cancellation is effective from the
          time we receive it, so send it as early as you can — the timing decides
          which row of the table above applies.
        </p>
      </Clause>

      <Clause n={5} title="When you get your money">
        <p>
          Approved refunds are sent back to the <strong>original payment method</strong>{" "}
          — the same card, UPI ID or bank account you paid from. We cannot redirect
          a refund to a different account.
        </p>
        <p>
          We initiate the refund within 48 hours of approving your cancellation.
          After that it takes <strong>{refundProcessingDays}</strong> to appear in
          your account, depending on your bank or UPI provider. That last stretch
          is in their hands, not ours.
        </p>
      </Clause>

      <Clause n={6} title="Disputes">
        <p>
          If something about a charge or refund looks wrong, contact us first at{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> — most issues are
          settled the same day. See our{" "}
          <Link href="/terms">Terms &amp; Conditions</Link> for the full agreement
          governing bookings.
        </p>
      </Clause>
    </LegalPage>
  );
}
