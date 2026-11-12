import { E2E_MUST_CHANGE_PASSWORD_OPERATION } from "../constants/E2ePasswordRecoveryReset.constants";
import {
  E2E_SUPABASE_COLUMN,
  E2E_SUPABASE_TABLE,
} from "../constants/E2eSupabase.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";

export const setWorkerMustChangePassword = async (
  workerId: string,
  mustChangePassword: boolean
): Promise<void> => {
  const { error } = await createServiceRoleClient()
    .from(E2E_SUPABASE_TABLE.WORKERS)
    .update({
      [E2E_SUPABASE_COLUMN.MUST_CHANGE_PASSWORD]:
        mustChangePassword,
    })
    .eq(E2E_SUPABASE_COLUMN.ID, workerId);

  if (error) {
    failE2eOperation(
      E2E_MUST_CHANGE_PASSWORD_OPERATION,
      error.message
    );
  }
};
