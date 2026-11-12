import {
  SUPABASE_RPC,
  WORKER_ACCOUNT_RESULT,
  type WorkerAccountResult,
} from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { isWorkerAccountResult } from "./isWorkerAccountResult";
import type { WorkerExpiryExtension } from "./models/WorkerExpiryExtension.interface";

export const extendWorkerExpiry = async (
  supabase: ServerSupabaseClient,
  { expiresAt, workerId }: WorkerExpiryExtension
): Promise<WorkerAccountResult> => {
  const { data, error } = await supabase.rpc(
    SUPABASE_RPC.EXTEND_WORKER_EXPIRY,
    {
      new_expires_at: expiresAt,
      target_worker: workerId,
    }
  );

  throwIfSupabaseError(
    error,
    SUPABASE_RPC.EXTEND_WORKER_EXPIRY
  );

  return isWorkerAccountResult(data)
    ? data
    : WORKER_ACCOUNT_RESULT.FAILED;
};
