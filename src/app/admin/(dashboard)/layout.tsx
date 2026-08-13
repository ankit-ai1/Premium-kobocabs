import Link from "next/link";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin-auth";
import { site } from "@/data/site";
import AdminNav from "@/components/admin/AdminNav";
import SignOutButton from "@/components/admin/SignOutButton";

export const metadata: Metadata = {
  title: `Admin — ${site.name}`,
  robots: { index: false, follow: false },
};

// Admin data must never be served from a cache.
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { admin } = await requireAdmin();

  return (
    <div className="min-h-screen bg-paper">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-6 p-5 lg:flex-row lg:gap-8 lg:p-8">
        <aside className="lg:w-56 lg:shrink-0">
          <div className="card p-5 lg:sticky lg:top-8">
            <Link href="/" className="display block text-xl leading-none">
              Yantra<span className="hi">Cabs</span>
            </Link>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-ink-muted">
              Admin Portal
            </div>

            <div className="my-5 h-px bg-ink/[0.08]" />
            <AdminNav />
            <div className="my-5 h-px bg-ink/[0.08]" />

            <div className="text-xs font-semibold leading-tight">
              {admin.full_name || admin.email}
            </div>
            <div className="mt-0.5 text-[11px] uppercase tracking-widest text-ink-muted">
              {admin.role}
            </div>
            <div className="mt-4">
              <SignOutButton />
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
