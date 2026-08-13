import type { BookingStatus, EnquiryStatus, PaymentStatus } from "@/lib/supabase/types";

const BOOKING_TONE: Record<BookingStatus, string> = {
  pending: "bg-taxi/25 text-ink",
  confirmed: "bg-emerald-100 text-emerald-900",
  assigned: "bg-sky-100 text-sky-900",
  completed: "bg-ink text-taxi",
  cancelled: "bg-rose-100 text-rose-900",
};

const PAYMENT_TONE: Record<PaymentStatus, string> = {
  unpaid: "bg-ink/[0.07] text-ink-muted",
  advance_paid: "bg-taxi/25 text-ink",
  paid: "bg-emerald-100 text-emerald-900",
  refunded: "bg-sky-100 text-sky-900",
  failed: "bg-rose-100 text-rose-900",
};

const ENQUIRY_TONE: Record<EnquiryStatus, string> = {
  new: "bg-taxi/25 text-ink",
  contacted: "bg-sky-100 text-sky-900",
  converted: "bg-emerald-100 text-emerald-900",
  closed: "bg-ink/[0.07] text-ink-muted",
};

function Pill({ tone, children }: { tone: string; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${tone}`}
    >
      {children}
    </span>
  );
}

export function BookingBadge({ status }: { status: BookingStatus }) {
  return <Pill tone={BOOKING_TONE[status]}>{status}</Pill>;
}

export function PaymentBadge({ status }: { status: PaymentStatus }) {
  return <Pill tone={PAYMENT_TONE[status]}>{status.replace("_", " ")}</Pill>;
}

export function EnquiryBadge({ status }: { status: EnquiryStatus }) {
  return <Pill tone={ENQUIRY_TONE[status]}>{status}</Pill>;
}

export function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="card p-5">
      <div className="text-[11px] font-bold uppercase tracking-widest text-ink-muted">
        {label}
      </div>
      <div className="num-taxi mt-2 text-[2rem] leading-none">{value}</div>
      {sub && <div className="mt-2 text-xs text-ink-muted">{sub}</div>}
    </div>
  );
}

export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="card grid place-items-center p-12 text-center text-sm text-ink-muted">
      {children}
    </div>
  );
}

/** ₹ with Indian digit grouping, tolerant of the numeric strings Postgres returns. */
export function inr(value: number | string | null | undefined): string {
  const n = Number(value ?? 0);
  return `₹${(Number.isFinite(n) ? n : 0).toLocaleString("en-IN")}`;
}

/** Dates are displayed in IST — the business and every customer is in India. */
export function istDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function istDate(value: string | null): string {
  if (!value) return "—";
  return new Date(`${value}T00:00:00+05:30`).toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
