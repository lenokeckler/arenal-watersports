import { INVENTORY_DATA_SOURCE } from "@/app/constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { E2E_INVENTORY_SCENARIO } from "../constants/E2eInventoryScenario.constants";
import type { E2eInventoryFixture } from "../models/E2eInventoryFixture.type";
import type { E2eInventoryStock } from "../models/E2eInventoryStock.type";

export const writeInventoryStockFixture = async (
  fixture: E2eInventoryFixture,
  stock: E2eInventoryStock
): Promise<void> => {
  const { error } = await fixture.client
    .from(INVENTORY_DATA_SOURCE.EQUIPMENT_STOCK_TABLE)
    .upsert({
      ...stock,
      category_id: fixture.id,
      updated_by: E2E_INVENTORY_SCENARIO.ADMIN_ID,
    });
  throwIfSupabaseError(error, fixture.name);
};
