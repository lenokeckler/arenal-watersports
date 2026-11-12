import { E2E_SUPABASE_TABLE } from "../constants/E2eSupabase.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";

export const createMovementReservationFixture = async (
  customerName: string
): Promise<void> => {
  const client = createServiceRoleClient();
  const { data: worker, error: workerError } = await client
    .from(E2E_SUPABASE_TABLE.WORKERS)
    .select("id")
    .eq("base_role", "administracion")
    .limit(1)
    .single();

  if (workerError || !worker) {
    failE2eOperation(
      "find the administrator of the reservation",
      workerError?.message ?? "no row"
    );
    return;
  }

  const { error } = await client
    .from(E2E_SUPABASE_TABLE.RESERVATIONS)
    .insert({
      created_by: worker.id,
      customer_name: customerName,
      duration_minutes: 60,
      people_count: 1,
      starts_at: new Date().toISOString(),
      status: "scheduled",
      type: "rental",
      updated_by: worker.id,
    });

  if (error) {
    failE2eOperation(
      "create the reservation",
      error.message
    );
  }
};
