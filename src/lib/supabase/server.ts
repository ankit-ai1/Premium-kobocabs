import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseAnonKey, supabaseUrl } from "./env";

/**
 * Request-scoped client that carries the signed-in admin's session, so RLS
 * applies as that user. Use this for admin reads/writes — it means a bug in a
 * query can't return more than that user is entitled to.
 */
export function createServerSupabase() {
  const cookieStore = cookies();

  return createServerClient(supabaseUrl(), supabaseAnonKey(), {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: Record<string, unknown>) {
        // Server Components cannot set cookies. Session refresh is handled by
        // middleware instead, so swallowing this is safe.
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          /* noop */
        }
      },
      remove(name: string, options: Record<string, unknown>) {
        try {
          cookieStore.set({ name, value: "", ...options });
        } catch {
          /* noop */
        }
      },
    },
  });
}
