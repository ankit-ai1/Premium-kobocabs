import { adminDb } from "@/lib/admin-auth";
import type { Driver } from "@/lib/supabase/types";
import { EmptyState } from "@/components/admin/ui";
import DriverForm from "@/components/admin/DriverForm";

export const dynamic = "force-dynamic";

export default async function DriversPage() {
  const db = await adminDb();
  const { data, error } = await db
    .from("drivers")
    .select("*")
    .order("active", { ascending: false })
    .order("name")
    .returns<Driver[]>();

  return (
    <>
      <h1 className="display text-3xl sm:text-4xl">
        Dri<span className="hi">vers</span>
      </h1>
      <p className="mt-2 text-sm text-ink-muted">
        Only drivers marked available appear in the assignment dropdown on a booking.
      </p>

      <h2 className="display mt-8 text-lg">Add a driver</h2>
      <div className="mt-3">
        <DriverForm />
      </div>

      <h2 className="display mt-10 text-lg">
        Roster {data?.length ? `(${data.length})` : ""}
      </h2>

      {error && (
        <p className="mt-4 rounded-lg border border-ink/15 bg-taxi/15 px-4 py-3 text-sm">
          Could not load drivers: {error.message}
        </p>
      )}

      <div className="mt-3 grid gap-4">
        {data?.length
          ? data.map((d) => <DriverForm key={d.id} driver={d} />)
          : !error && <EmptyState>No drivers on the roster yet.</EmptyState>}
      </div>
    </>
  );
}
