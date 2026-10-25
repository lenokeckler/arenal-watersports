import {
  SUPABASE_RPC,
  WORKER_ACCOUNT_ACTION,
  WORKER_ACCOUNT_RESULT,
  type WorkerAccountResult,
} from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { WorkerAccountChange } from "./models/WorkerAccountChange.interface";

const WORKER_ACCOUNT_RPC = {
  [WORKER_ACCOUNT_ACTION.BLOCK]: SUPABASE_RPC.BLOCK_WORKER,
  [WORKER_ACCOUNT_ACTION.UNLOCK]:
    SUPABASE_RPC.UNLOCK_WORKER,
} as const;

const RESULTS: readonly unknown[] = Object.values(
  WORKER_ACCOUNT_RESULT
);

const isWorkerAccountResult = (
  value: unknown
): value is WorkerAccountResult => RESULTS.includes(value);

export const changeWorkerAccount = async (
  supabase: ServerSupabaseClient,
  { action, workerId }: WorkerAccountChange
): Promise<WorkerAccountResult> => {
  const rpc = WORKER_ACCOUNT_RPC[action];
  const { data, error } = await supabase.rpc(rpc, {
    target_worker: workerId,
  });

  throwIfSupabaseError(error, rpc);

  return isWorkerAccountResult(data)
    ? data
    : WORKER_ACCOUNT_RESULT.FAILED;
};
