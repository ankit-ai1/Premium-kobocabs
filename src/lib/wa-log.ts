/**
 * Records a WhatsApp hand-off so it lands in the admin Enquiries screen.
 *
 * Fire-and-forget by design: the visitor is on their way to WhatsApp and must
 * never wait on — or be blocked by — our logging. `sendBeacon` survives the tab
 * being backgrounded when the WhatsApp app takes over, which a plain fetch on
 * mobile often does not.
 */
export type WhatsAppLeadInput = {
  kind: "booking_widget" | "booking_dialog" | "contact_form" | "floating_button" | "link";
  /** Button text or a short description of what was tapped. */
  label?: string | null;
  /** The pre-typed message, or the full wa.me URL to pull it out of. */
  message?: string | null;
};

/** Same link tapped twice in a moment is one lead, not two. */
let lastKey = "";
let lastAt = 0;

export function logWhatsApp(input: WhatsAppLeadInput) {
  if (typeof window === "undefined") return;

  const key = `${input.kind}|${input.label ?? ""}|${input.message ?? ""}`;
  const now = Date.now();
  if (key === lastKey && now - lastAt < 4000) return;
  lastKey = key;
  lastAt = now;

  const body = JSON.stringify({
    kind: input.kind,
    label: input.label ?? null,
    message: input.message ?? null,
    page: window.location.pathname + window.location.search,
    referrer: document.referrer || null,
  });

  try {
    const blob = new Blob([body], { type: "application/json" });
    if (navigator.sendBeacon?.("/api/whatsapp-leads", blob)) return;
  } catch {
    // Falls through to fetch below.
  }

  void fetch("/api/whatsapp-leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

/** Pulls the pre-typed text back out of a wa.me link, for anchor clicks. */
export function messageFromWaHref(href: string): string | null {
  const i = href.indexOf("?text=");
  if (i === -1) return null;
  try {
    return decodeURIComponent(href.slice(i + 6).replace(/\+/g, " "));
  } catch {
    return null;
  }
}
