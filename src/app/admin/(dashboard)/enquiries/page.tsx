import { adminDb } from "@/lib/admin-auth";
import type { Enquiry, WhatsAppLead, WhatsAppLeadKind } from "@/lib/supabase/types";
import { EmptyState, istDateTime } from "@/components/admin/ui";
import EnquiryStatusSelect from "@/components/admin/EnquiryStatusSelect";
import WhatsAppLeadToggle from "@/components/admin/WhatsAppLeadToggle";
import { site } from "@/data/site";

export const dynamic = "force-dynamic";

const KIND_LABEL: Record<WhatsAppLeadKind, string> = {
  booking_widget: "Booking widget",
  booking_dialog: "Booking form",
  contact_form: "Contact form",
  floating_button: "Floating button",
  link: "Site link",
};

export default async function EnquiriesPage() {
  const db = await adminDb();

  const [enquiries, waLeads] = await Promise.all([
    db
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200)
      .returns<Enquiry[]>(),
    db
      .from("whatsapp_leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200)
      .returns<WhatsAppLead[]>(),
  ]);

  const { data, error } = enquiries;

  // The screen stays clean for staff: a WhatsApp-log read failure falls back to
  // the ordinary empty state and reports itself to the server log instead.
  if (waLeads.error) console.error("[admin/enquiries] whatsapp_leads:", waLeads.error.message);

  return (
    <>
      <h1 className="display text-3xl sm:text-4xl">
        Enqui<span className="hi">ries</span>
      </h1>
      <p className="mt-2 text-sm text-ink-muted">
        Leads from the contact form. These are people who asked but haven&apos;t booked.
      </p>

      {error && (
        <p className="mt-6 rounded-lg border border-ink/15 bg-taxi/15 px-4 py-3 text-sm">
          Could not load enquiries: {error.message}
        </p>
      )}

      <div className="mt-7 grid gap-4">
        {data?.length
          ? data.map((e) => (
              <article key={e.id} className="card p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="card-title text-base">{e.name}</h2>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-muted">
                      <a href={`tel:+91${e.phone}`} className="hover:text-ink">
                        +91 {e.phone}
                      </a>
                      {e.email && (
                        <a href={`mailto:${e.email}`} className="hover:text-ink">
                          {e.email}
                        </a>
                      )}
                      <span>{istDateTime(e.created_at)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={`${site.whatsapp}?text=${encodeURIComponent(
                        `Hi ${e.name}, thanks for contacting ${site.name}!`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-outline !py-2 text-[11px]"
                    >
                      WhatsApp
                    </a>
                    <EnquiryStatusSelect id={e.id} status={e.status} />
                  </div>
                </div>

                {e.message && (
                  <p className="mt-4 rounded-xl border border-ink/[0.08] bg-paper/80 p-4 text-sm leading-relaxed">
                    {e.message}
                  </p>
                )}
              </article>
            ))
          : !error && <EmptyState>No enquiries yet.</EmptyState>}
      </div>

      {/* ---- WhatsApp hand-offs ---- */}

      <h2 className="display mt-16 text-2xl sm:text-3xl">
        WhatsApp <span className="hi">chats</span>
      </h2>
      <p className="mt-2 text-sm text-ink-muted">
        Every tap that opened WhatsApp, with the message we pre-typed. WhatsApp gives us no
        callback, so this records that a chat was opened &mdash; match it against your inbox to
        see who actually wrote in.
      </p>

      <div className="mt-7 grid gap-4">
        {waLeads.data?.length
          ? waLeads.data.map((lead) => (
              <article
                key={lead.id}
                className={`card p-5 ${lead.handled ? "opacity-60" : ""}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="card-title text-base">
                      {lead.label || KIND_LABEL[lead.kind]}
                    </h3>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-muted">
                      <span>{KIND_LABEL[lead.kind]}</span>
                      {lead.page && <span>{lead.page}</span>}
                      <span>{istDateTime(lead.created_at)}</span>
                    </div>
                  </div>
                  <WhatsAppLeadToggle id={lead.id} handled={lead.handled} />
                </div>

                {lead.message && (
                  <p className="mt-4 whitespace-pre-line rounded-xl border border-ink/[0.08] bg-paper/80 p-4 text-sm leading-relaxed">
                    {lead.message}
                  </p>
                )}
              </article>
            ))
          : <EmptyState>No WhatsApp chats logged yet.</EmptyState>}
      </div>
    </>
  );
}
