import type { InventorySupabaseClient } from "@/app/services/operations/inventory/models/InventoryReadModels.interface";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { E2E_INVENTORY_ACCESS } from "../constants/E2eInventoryAccess.constants";
import { E2E_INVENTORY_SCENARIO } from "../constants/E2eInventoryScenario.constants";

export const cleanupInventoryWorkerFixture = async (
  client: InventorySupabaseClient,
  id: string
): Promise<void> => {
  const { error: areaError } = await client
    .from(E2E_INVENTORY_ACCESS.WORKER_AREAS_TABLE)
    .delete()
    .eq(E2E_INVENTORY_ACCESS.WORKER_ID_COLUMN, id);
  throwIfSupabaseError(areaError, id);
  const { error: workerError } = await client
    .from(E2E_INVENTORY_ACCESS.WORKERS_TABLE)
    .delete()
    .eq(E2E_INVENTORY_SCENARIO.ID_COLUMN, id);
  throwIfSupabaseError(workerError, id);
  const { error } = await client.auth.admin.deleteUser(id);
  if (error) {
    throw error;
  }
};
