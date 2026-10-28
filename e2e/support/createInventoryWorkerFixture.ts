import { randomUUID } from "node:crypto";
import type { WorkArea } from "@/app/constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { E2E_INVENTORY_ACCESS } from "../constants/E2eInventoryAccess.constants";
import { E2E_INVENTORY_SCENARIO } from "../constants/E2eInventoryScenario.constants";
import { createLocalInventoryClient } from "./createLocalInventoryClient";
import { createInventoryAuthUser } from "./createInventoryAuthUser";
import { cleanupInventoryWorkerFixture } from "./cleanupInventoryWorkerFixture";

export const createInventoryWorkerFixture = async (
  role: WorkArea
) => {
  const client = createLocalInventoryClient();
  const username = `${E2E_INVENTORY_ACCESS.USERNAME_PREFIX}${randomUUID()}`;
  const id = await createInventoryAuthUser(username);
  const { error: workerError } = await client
    .from(E2E_INVENTORY_ACCESS.WORKERS_TABLE)
    .insert({
      base_role: role,
      created_by: E2E_INVENTORY_SCENARIO.ADMIN_ID,
      full_name: username,
      id,
      username,
    });
  if (workerError) {
    const { error: cleanupError } =
      await client.auth.admin.deleteUser(id);
    if (cleanupError) {
      throw cleanupError;
    }
    throwIfSupabaseError(workerError, username);
  }
  return {
    cleanup: () =>
      cleanupInventoryWorkerFixture(client, id),
    username,
  };
};
