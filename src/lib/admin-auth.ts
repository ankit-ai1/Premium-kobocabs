import "server-only";

import { redirect } from "next/navigation";
import { createServerSupabase } from "./supabase/server";
import { createAdminClient } from "./supabase/admin";
import type { AdminUser } from "./supabase/types";

/**
 * The security boundary for the whole admin portal.
 *
 * Call this at the top of every admin page AND every server action — a layout
 * check alone does not protect server actions, which are separately callable
 * HTTP endpoints.
 *
 * Having an auth account is not enough: there must be an active row in
 * admin_users. That means signups (if ever left on) grant nothing by default.
 */
export async function requireAdmin(): Promise<{ admin: AdminUser }> {
  const supabase = createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: admin } = await supabase
    .from("admin_users")
    .select("*")
    .eq("user_id", user.id)
    .eq("active", true)
    .maybeSingle<AdminUser>();

  if (!admin) redirect("/admin/no-access");

  return { admin };
}

/**
 * Service-role client, handed out only after the caller has been confirmed as
 * an admin. Admin screens need to read across all rows and update workflow
 * fields, so they run privileged — but never before this check.
 */
export async function adminDb() {
  await requireAdmin();
  return createAdminClient();
}
