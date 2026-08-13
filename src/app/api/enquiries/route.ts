import { createAdminClient } from "@/lib/supabase/admin";
import { isEmail, jsonError, normalisePhone, str } from "@/lib/validate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Contact-form leads. Saved so they show up in the admin inbox, not just WhatsApp. */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON body.");
  }

  const name = str(body.name, 120);
  if (name.length < 2) return jsonError("Please enter your name.");

  const phone = normalisePhone(body.phone);
  if (!phone) return jsonError("Please enter a valid 10-digit mobile number.");

  const email = str(body.email, 160);
  if (email && !isEmail(email)) return jsonError("Please enter a valid email address.");

  const message = str(body.message, 2000);

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("enquiries").insert({
      name,
      phone,
      email: email || null,
      message: message || null,
      source: str(body.source, 40) || "contact_form",
    });
    if (error) throw error;

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[api/enquiries]", err);
    return jsonError("Could not send your message. Please WhatsApp us instead.", 500);
  }
}
