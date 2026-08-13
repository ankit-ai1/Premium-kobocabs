export const metadata = { robots: { index: false, follow: false } };

/** Rendered by middleware when Supabase env vars are missing entirely. */
export default function SetupRequiredPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-paper p-5">
      <div className="card w-full max-w-lg p-8">
        <h1 className="display text-3xl">
          Setup <span className="hi">Required</span>
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          The admin portal needs Supabase credentials. Copy{" "}
          <code className="rounded bg-ink/5 px-1.5 py-0.5 text-xs">.env.example</code> to{" "}
          <code className="rounded bg-ink/5 px-1.5 py-0.5 text-xs">.env.local</code>, fill in
          your project values, then restart the dev server.
        </p>
        <pre className="mt-5 overflow-x-auto rounded-xl bg-ink p-4 text-xs leading-relaxed text-white">
{`NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=`}
        </pre>
        <p className="mt-5 text-xs text-ink-muted">
          See <span className="font-semibold text-ink">README.md → Backend setup</span> for the
          full walkthrough, including running the SQL migration.
        </p>
      </div>
    </main>
  );
}
