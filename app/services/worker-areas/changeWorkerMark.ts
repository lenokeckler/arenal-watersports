import {
  SUPABASE_RPC,
  WORKER_AREA_INTENT,
  WORKER_MARK_CHANGE_RESULT,
  type WorkerMarkChangeResult,
} from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { WorkerMarkChange } from "./models/WorkerMarkChange.interface";

const WORKER_MARK_RPC = {
  [WORKER_AREA_INTENT.GRANT]:
    SUPABASE_RPC.GRANT_WORKER_MARK,
  [WORKER_AREA_INTENT.REVOKE]:
    SUPABASE_RPC.REVOKE_WORKER_MARK,
} as const;

const CHANGE_RESULTS: readonly unknown[] = Object.values(
  WORKER_MARK_CHANGE_RESULT
);

const isWorkerMarkChangeResult = (
  value: unknown
): value is WorkerMarkChangeResult =>
  CHANGE_RESULTS.includes(value);

export const changeWorkerMark = async (
  supabase: ServerSupabaseClient,
  { intent, mark, workerId }: WorkerMarkChange
): Promise<WorkerMarkChangeResult> => {
  const rpc = WORKER_MARK_RPC[intent];
  const { data, error } = await supabase.rpc(rpc, {
    target_mark: mark,
    target_worker: workerId,
  });

  throwIfSupabaseError(error, rpc);

  return isWorkerMarkChangeResult(data)
    ? data
    : WORKER_MARK_CHANGE_RESULT.FAILED;
};
