# Razorpay — phase 2 plan

Nothing here is implemented yet. The database and the booking endpoint were
built to accept it without rework, so this is the remaining checklist.

## Account prerequisites

1. Sign up at razorpay.com. **Test keys** (`rzp_test_…`) are available
   immediately — all development happens on these.
2. **Live keys need KYC**: PAN, business proof, GST if registered, cancelled
   cheque / bank details. Approval typically takes 2–4 working days.
3. Payment Methods → enable UPI, cards, netbanking. UPI carries roughly zero
   MDR; cards are around 2%.
4. Settings → Webhooks → add `https://<domain>/api/webhooks/razorpay`, set a
   secret, subscribe to `payment.captured`, `payment.failed`, `refund.processed`.

Env vars are already stubbed in `.env.example`.

## What already exists

| Piece | Where | State |
| --- | --- | --- |
| Server-computed fare | `src/app/api/bookings/route.ts` | done — browser never sends a price |
| `payments` table | `supabase/migrations/0001_init.sql` | created, unused |
| `webhook_events` table | same | created, unused — `(provider, event_id)` is unique for replay safety |
| `bookings.payment_status` / `amount_paid` | same | present, currently set by hand in admin |
| Rate snapshot per booking | `bookings.rate_per_km` | done — history survives rate changes |

## What to build

**1. Extend `POST /api/bookings`.** After the booking row is inserted, create a
Razorpay order and return `order_id` alongside the booking. Amount comes from
the `fare_total` the server just calculated — in **paise** (`fare * 100`). Put
`booking_id` in the order's `notes` so the webhook can find its way back.

**2. Checkout in `BookingDialog`.** Load
`https://checkout.razorpay.com/v1/checkout.js`, open it with the returned
`order_id` and `NEXT_PUBLIC_RAZORPAY_KEY_ID`.

**3. `POST /api/payments/verify`.** Recompute
`HMAC_SHA256(order_id + "|" + payment_id, KEY_SECRET)` and compare with
`razorpay_signature`. This exists only to show the user instant confirmation.

**4. `POST /api/webhooks/razorpay` — the source of truth.** Must:

- `export const runtime = "nodejs"` (needs node `crypto`)
- read the **raw** body with `await req.text()` *before* parsing, and verify
  `x-razorpay-signature` against it with the webhook secret
- insert into `webhook_events` first; a duplicate `event_id` means already
  handled, return 200 and stop
- upsert `payments` keyed on `razorpay_payment_id` (unique), then update the
  booking's `payment_status` / `amount_paid`
- return 200 quickly; Razorpay retries on anything else

Verify and webhook are **both** required. If a customer closes the tab after
paying, the verify call never fires but the money has moved — only the webhook
reflects that.

## Open business decisions

These change the code, so settle them before building:

- **Advance vs full payment.** Full prepay on a ₹8,000 outstation trip hurts
  conversion. A fixed advance (₹500) or a percentage (20%) with the balance to
  the driver is the usual pattern — `payment_status` already has an
  `advance_paid` value for this.
- **Cancellation and refund policy.** Needed for the customer-facing terms and
  for the refund action in admin.
- **Guest checkout vs customer accounts.** Guest (phone only) converts better;
  accounts enable a "my bookings" page.

## Admin work that follows

- Payments tab reconciling against Razorpay IDs
- Refund button (`POST /v1/payments/:id/refund`), writing back to `payments`
- Show `payments` history on the booking detail page
- Make `payment_status` read-only in `BookingEditor` once the webhook owns it
