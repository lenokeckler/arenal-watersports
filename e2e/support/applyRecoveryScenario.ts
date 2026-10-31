import type { NullableRef } from "@/app/types";
import {
  E2E_RECOVERY_BLOCK,
  E2E_RECOVERY_SCENARIO,
} from "../constants/E2ePasswordRecovery.constants";
import {
  E2E_SUPABASE_COLUMN,
  E2E_SUPABASE_TABLE,
} from "../constants/E2eSupabase.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";
import type { RecoveryScenario } from "./models/RecoveryScenario.type";
import type { WorkerUpdate } from "./models/WorkerUpdate.type";

const readScenarioPatch = (
  scenario: RecoveryScenario
): NullableRef<WorkerUpdate> => {
  switch (scenario) {
    case E2E_RECOVERY_SCENARIO.BLOCKED_BY_ADMINISTRATION:
      return E2E_RECOVERY_BLOCK.ADMINISTRATION;
    case E2E_RECOVERY_SCENARIO.BLOCKED_BY_ATTEMPTS:
      return E2E_RECOVERY_BLOCK.ATTEMPTS;
    case E2E_RECOVERY_SCENARIO.RETIRED:
      return {
        [E2E_SUPABASE_COLUMN.DELETED_AT]:
          new Date().toISOString(),
      };
    default:
      return null;
  }
};

export const applyRecoveryScenario = async (
  workerId: string,
  scenario: RecoveryScenario
): Promise<void> => {
  const patch = readScenarioPatch(scenario);

  if (!patch) {
    return;
  }

  const { error } = await createServiceRoleClient()
    .from(E2E_SUPABASE_TABLE.WORKERS)
    .update(patch)
    .eq(E2E_SUPABASE_COLUMN.ID, workerId);

  if (error) {
    failE2eOperation(
      "apply the recovery scenario",
      error.message
    );
  }
};
