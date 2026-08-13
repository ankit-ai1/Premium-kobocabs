import Link from "next/link";
import SignOutButton from "@/components/admin/SignOutButton";

export const metadata = { robots: { index: false, follow: false } };

/** Signed in, but no active row in admin_users. */
export default function NoAccessPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-paper p-5">
      <div className="card w-full max-w-md p-8 text-center">
        <h1 className="display text-3xl">
          No <span className="hi">Access</span>
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Your account is signed in but has not been granted admin access. Ask the
          owner to add you in the <span className="font-semibold text-ink">admin_users</span>{" "}
          table.
        </p>
        <div className="mt-7 grid gap-3">
          <SignOutButton />
          <Link href="/" className="text-xs font-bold uppercase tracking-widest text-ink-muted hover:text-ink">
            Back to site
          </Link>
        </div>
      </div>
    </main>
  );
}
