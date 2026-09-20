"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const supabase = createBrowserSupabase();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      // Only a 400 means the credentials were wrong. Anything else — the
      // project paused, DNS gone, offline — must not masquerade as a bad
      // password, or someone resets a password that was never the problem.
      setError(
        signInError.status === 400
          ? "Incorrect email or password."
          : "Could not reach the login server. Check that the Supabase project is running."
      );
      setBusy(false);
      return;
    }

    // refresh() so the server components pick up the new session cookie before
    // we navigate into the guarded area.
    router.refresh();
    router.replace(params.get("next") || "/admin");
  };

  const label = "mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-ink-muted";

  return (
    <form onSubmit={submit} className="mt-7 grid gap-5">
      <div>
        <label className={label} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          required
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className={label} htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && (
        <p className="rounded-lg border border-ink/15 bg-taxi/15 px-4 py-2.5 text-xs font-medium text-ink">
          {error}
        </p>
      )}

      <button type="submit" disabled={busy} className="btn-taxi w-full disabled:opacity-60">
        {busy ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}
