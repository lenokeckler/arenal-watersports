import {
  E2E_SUPABASE_COLUMN,
  E2E_SUPABASE_TABLE,
} from "../constants/E2eSupabase.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";

export const removeWorkerRecoveryPins = async (
  workerId: string
): Promise<void> => {
  const { error } = await createServiceRoleClient()
    .from(E2E_SUPABASE_TABLE.PASSWORD_RESET_PINS)
    .delete()
    .eq(E2E_SUPABASE_COLUMN.WORKER_ID, workerId);

  if (error) {
    failE2eOperation(
      "remove the worker recovery PINs",
      error.message
    );
  }
};
