import { E2E_SUPABASE_TABLE } from "../constants/E2eSupabase.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";

export const createInventoryCountHistoryFixture = async (
  notes: string,
  unitCode: string
): Promise<void> => {
  const client = createServiceRoleClient();
  const { data: worker, error: workerError } = await client
    .from(E2E_SUPABASE_TABLE.WORKERS)
    .select("id")
    .eq("base_role", "administracion")
    .limit(1)
    .single();
  const { data: unit, error: unitError } = await client
    .from(E2E_SUPABASE_TABLE.EQUIPMENT_UNITS)
    .select("id, category_id, status")
    .eq("code", unitCode)
    .single();

  if (workerError || !worker || unitError || !unit) {
    failE2eOperation(
      "find the worker and unit of the count",
      workerError?.message ?? unitError?.message ?? "no row"
    );
    return;
  }

  const { data: count, error: countError } = await client
    .from(E2E_SUPABASE_TABLE.INVENTORY_COUNTS)
    .insert({ created_by: worker.id, notes })
    .select("id")
    .single();

  if (countError || !count) {
    failE2eOperation(
      "create the inventory count",
      countError?.message ?? "no row"
    );
    return;
  }

  const { error: lineError } = await client
    .from(E2E_SUPABASE_TABLE.INVENTORY_COUNT_LINES)
    .insert({
      category_id: unit.category_id,
      confirmed_status: "damaged",
      count_id: count.id,
      system_status: unit.status,
      unit_id: unit.id,
    });

  if (lineError) {
    failE2eOperation(
      "create the inventory count line",
      lineError.message
    );
  }
};
