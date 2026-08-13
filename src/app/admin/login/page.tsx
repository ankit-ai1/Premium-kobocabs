import { Suspense } from "react";
import type { Metadata } from "next";
import { site } from "@/data/site";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: `Admin — ${site.name}`,
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-paper p-5">
      <div className="card w-full max-w-md p-8">
        <span className="eyebrow">{site.name}</span>
        <h1 className="display mt-3 text-3xl">
          Admin <span className="hi">Portal</span>
        </h1>
        <p className="mt-2 text-sm text-ink-muted">
          Staff access only. Accounts are created by the owner.
        </p>

        <Suspense fallback={<div className="mt-7 h-64 animate-pulse rounded-xl bg-ink/5" />}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
