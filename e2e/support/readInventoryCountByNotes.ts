import { E2E_SUPABASE_TABLE } from "../constants/E2eSupabase.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";

export interface E2eInventoryCountRecord {
  confirmedUnitLines: number;
  createdBy: string;
  quantityLines: number;
}

export const readInventoryCountByNotes = async (
  notes: string
): Promise<E2eInventoryCountRecord> => {
  const client = createServiceRoleClient();
  const { data: count, error } = await client
    .from(E2E_SUPABASE_TABLE.INVENTORY_COUNTS)
    .select("id, created_by")
    .eq("notes", notes)
    .single();

  if (error || !count) {
    return failE2eOperation(
      "read the inventory count",
      error?.message ?? "no row"
    );
  }

  const { data: lines, error: linesError } = await client
    .from(E2E_SUPABASE_TABLE.INVENTORY_COUNT_LINES)
    .select("unit_id")
    .eq("count_id", count.id);

  if (linesError || !lines) {
    return failE2eOperation(
      "read the inventory count lines",
      linesError?.message ?? "no rows"
    );
  }

  return {
    confirmedUnitLines: lines.filter(
      (line) => line.unit_id !== null
    ).length,
    createdBy: count.created_by,
    quantityLines: lines.filter(
      (line) => line.unit_id === null
    ).length,
  };
};
