// ============================================================
//  Legal / policy content
//
//  Kept apart from site.ts because these numbers are a commitment to the
//  customer and are quoted by Razorpay during KYC review. Change them here and
//  the Terms and Refund pages both update.
// ============================================================

/** Shown on every policy page so customers can see how current it is. */
export const policyUpdated = "15 August 2026";

/**
 * Online advance per booking, in rupees.
 *
 * The balance is collected by the driver. Must stay in sync with the amount the
 * payment code charges once Razorpay goes live — see docs/razorpay-plan.md.
 */
export const advanceAmount = 500;

export type CancellationTier = {
  window: string;
  refund: string;
  note: string;
};

/** Read top to bottom as "the later you cancel, the less comes back". */
export const cancellationTiers: CancellationTier[] = [
  {
    window: "More than 24 hours before pickup",
    refund: "100% of the advance",
    note: `Your full ₹${advanceAmount} advance is returned.`,
  },
  {
    window: "12 to 24 hours before pickup",
    refund: "50% of the advance",
    note: `₹${advanceAmount / 2} is returned; the rest covers the driver already allocated to your trip.`,
  },
  {
    window: "Less than 12 hours before pickup",
    refund: "No refund",
    note: "At this point the vehicle and driver are committed to your booking and cannot be reassigned.",
  },
  {
    window: "No-show at pickup",
    refund: "No refund",
    note: "The driver waits 45 minutes from your booked pickup time before a booking is marked as a no-show.",
  },
];

/** Working days for money to reach the customer's account after approval. */
export const refundProcessingDays = "5 to 7 working days";
