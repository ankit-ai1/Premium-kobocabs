import { adminDb } from "@/lib/admin-auth";
import type { Enquiry } from "@/lib/supabase/types";
import { EmptyState, istDateTime } from "@/components/admin/ui";
import EnquiryStatusSelect from "@/components/admin/EnquiryStatusSelect";
import { site } from "@/data/site";

export const dynamic = "force-dynamic";

export default async function EnquiriesPage() {
  const db = await adminDb();
  const { data, error } = await db
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200)
    .returns<Enquiry[]>();

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
    </>
  );
}
