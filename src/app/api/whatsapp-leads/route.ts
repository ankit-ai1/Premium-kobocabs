import { createAdminClient } from "@/lib/supabase/admin";
import { str } from "@/lib/validate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const KINDS = [
  "booking_widget",
  "booking_dialog",
  "contact_form",
  "floating_button",
  "link",
] as const;

/**
 * Logs a WhatsApp hand-off (see 0005_whatsapp_leads.sql).
 *
 * Called with `navigator.sendBeacon`, which cannot read the response and gives
 * up on anything slow, so this always answers 204 — a failure here must never
 * surface to a visitor who is already on their way to WhatsApp.
 */
export async function POST(request: Request) {
  try {
    // sendBeacon may label the body text/plain, so parse the text ourselves
    // rather than trusting request.json() to accept it.
    const raw = await request.text();
    const body = JSON.parse(raw) as Record<string, unknown>;

    const kind = str(body.kind, 40);
    const supabase = createAdminClient();
    const { error } = await supabase.from("whatsapp_leads").insert({
      kind: (KINDS as readonly string[]).includes(kind) ? kind : "link",
      label: str(body.label, 120) || null,
      page: str(body.page, 300) || null,
      message: str(body.message, 2000) || null,
      referrer: str(body.referrer, 300) || null,
      user_agent: str(request.headers.get("user-agent"), 300) || null,
    });
    if (error) throw error;
  } catch (err) {
    console.error("[api/whatsapp-leads]", err);
  }

  return new Response(null, { status: 204 });
}
