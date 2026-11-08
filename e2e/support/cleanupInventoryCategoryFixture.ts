import { INVENTORY_DATA_SOURCE } from "@/app/constants";
import type { InventorySupabaseClient } from "@/app/services/operations/inventory/models/InventoryReadModels.interface";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { E2E_INVENTORY_SCENARIO } from "../constants/E2eInventoryScenario.constants";

export const cleanupInventoryCategoryFixture = async (
  client: InventorySupabaseClient,
  id: string
): Promise<void> => {
  for (const table of [
    INVENTORY_DATA_SOURCE.EQUIPMENT_UNITS_TABLE,
    INVENTORY_DATA_SOURCE.EQUIPMENT_STOCK_TABLE,
  ]) {
    const { error } = await client
      .from(table)
      .delete()
      .eq(INVENTORY_DATA_SOURCE.CATEGORY_ID_COLUMN, id);
    throwIfSupabaseError(error, table);
  }
  const { error } = await client
    .from(INVENTORY_DATA_SOURCE.EQUIPMENT_CATEGORIES_TABLE)
    .delete()
    .eq(E2E_INVENTORY_SCENARIO.ID_COLUMN, id);
  throwIfSupabaseError(error, id);
};
