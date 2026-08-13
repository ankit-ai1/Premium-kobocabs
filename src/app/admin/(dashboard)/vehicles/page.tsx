import { adminDb } from "@/lib/admin-auth";
import type { Vehicle } from "@/lib/supabase/types";
import { EmptyState } from "@/components/admin/ui";
import VehicleRow from "@/components/admin/VehicleRow";

export const dynamic = "force-dynamic";

export default async function VehiclesPage() {
  const db = await adminDb();
  const { data, error } = await db
    .from("vehicles")
    .select("*")
    .order("sort_order")
    .returns<Vehicle[]>();

  return (
    <>
      <h1 className="display text-3xl sm:text-4xl">
        Fare <span className="hi">Rates</span>
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-ink-muted">
        These per-km rates drive every quote on the site. A change here takes effect on the
        next quote — bookings already taken keep the rate they were priced at, so your
        history stays accurate.
      </p>

      {error && (
        <p className="mt-6 rounded-lg border border-ink/15 bg-taxi/15 px-4 py-3 text-sm">
          Could not load vehicles: {error.message}
        </p>
      )}

      <div className="mt-7 grid gap-4">
        {data?.length
          ? data.map((v) => <VehicleRow key={v.id} vehicle={v} />)
          : !error && (
              <EmptyState>
                No vehicles found — did the seed section of the migration run?
              </EmptyState>
            )}
      </div>
    </>
  );
}
