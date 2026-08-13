import "server-only";

import { createClient } from "@supabase/supabase-js";
import { supabaseServiceKey, supabaseUrl } from "./env";

/**
 * Service-role client — bypasses RLS entirely.
 *
 * Use only inside route handlers and server actions, and only after you have
 * checked who is calling. This is what computes fares and writes bookings, so
 * the browser can never set its own price.
 *
 * The `server-only` import above makes importing this from a client component
 * a build error rather than a leaked secret.
 */
export function createAdminClient() {
  return createClient(supabaseUrl(), supabaseServiceKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
