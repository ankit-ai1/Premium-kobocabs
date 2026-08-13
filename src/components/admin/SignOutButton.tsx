"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase/client";

export default function SignOutButton({ className }: { className?: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  return (
    <button
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await createBrowserSupabase().auth.signOut();
        router.refresh();
        router.replace("/admin/login");
      }}
      className={className ?? "btn-outline w-full !py-2.5 text-xs"}
    >
      {busy ? "Signing out…" : "Sign Out"}
    </button>
  );
}
