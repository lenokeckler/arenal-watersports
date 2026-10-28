import { randomUUID } from "node:crypto";
import {
  INVENTORY_DATA_SOURCE,
  type InventoryTrackingMode,
} from "@/app/constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { E2E_INVENTORY_SCENARIO } from "../constants/E2eInventoryScenario.constants";
import { createLocalInventoryClient } from "./createLocalInventoryClient";
import { cleanupInventoryCategoryFixture } from "./cleanupInventoryCategoryFixture";

export const createInventoryCategoryFixture = async (
  trackingMode: InventoryTrackingMode,
  name: string = `${E2E_INVENTORY_SCENARIO.CATEGORY_NAME_PREFIX} ${randomUUID()}`
) => {
  const client = createLocalInventoryClient();
  const id = randomUUID();
  const { error } = await client
    .from(INVENTORY_DATA_SOURCE.EQUIPMENT_CATEGORIES_TABLE)
    .insert({
      created_by: E2E_INVENTORY_SCENARIO.ADMIN_ID,
      id,
      name,
      tracking_mode: trackingMode,
      updated_by: E2E_INVENTORY_SCENARIO.ADMIN_ID,
    });
  throwIfSupabaseError(error, name);

  const cleanup = () =>
    cleanupInventoryCategoryFixture(client, id);

  return { cleanup, client, id, name };
};
