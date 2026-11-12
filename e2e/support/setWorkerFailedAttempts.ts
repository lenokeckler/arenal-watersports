import {
  E2E_SUPABASE_COLUMN,
  E2E_SUPABASE_TABLE,
} from "../constants/E2eSupabase.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";

export const setWorkerFailedAttempts = async (
  workerId: string,
  attempts: number
): Promise<void> => {
  const { error } = await createServiceRoleClient()
    .from(E2E_SUPABASE_TABLE.WORKERS)
    .update({
      [E2E_SUPABASE_COLUMN.FAILED_ATTEMPTS]: attempts,
    })
    .eq(E2E_SUPABASE_COLUMN.ID, workerId);

  if (error) {
    failE2eOperation(
      "set the worker failed attempts",
      error.message
    );
  }
};
