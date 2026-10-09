import {
  E2E_SUPABASE_COLUMN,
  E2E_SUPABASE_TABLE,
} from "../constants/E2eSupabase.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";
import type { WorkerAccountState } from "./models/WorkerAccountState.interface";

export const readWorkerAccountState = async (
  workerId: string
): Promise<WorkerAccountState> => {
  const { data, error } = await createServiceRoleClient()
    .from(E2E_SUPABASE_TABLE.WORKERS)
    .select(
      `${E2E_SUPABASE_COLUMN.FAILED_ATTEMPTS}, ${E2E_SUPABASE_COLUMN.STATUS}`
    )
    .eq(E2E_SUPABASE_COLUMN.ID, workerId)
    .single();

  if (error) {
    return failE2eOperation(
      "read the worker account state",
      error.message
    );
  }

  return {
    failedAttempts: data.failed_attempts,
    status: data.status,
  };
};
