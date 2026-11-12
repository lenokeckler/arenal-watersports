import { E2E_SUPABASE_TABLE } from "../constants/E2eSupabase.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";

export const deleteInventoryCountByNotes = async (
  notes: string
): Promise<void> => {
  const { error } = await createServiceRoleClient()
    .from(E2E_SUPABASE_TABLE.INVENTORY_COUNTS)
    .delete()
    .eq("notes", notes);

  if (error) {
    failE2eOperation(
      "delete the inventory count",
      error.message
    );
  }
};
