import {
  SUPABASE_RPC,
  WORKER_AREA_CHANGE_RESULT,
  WORKER_AREA_INTENT,
  type WorkerAreaChangeResult,
} from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { WorkerAreaChange } from "./models/WorkerAreaChange.interface";

const WORKER_AREA_RPC = {
  [WORKER_AREA_INTENT.GRANT]:
    SUPABASE_RPC.GRANT_WORKER_AREA,
  [WORKER_AREA_INTENT.REVOKE]:
    SUPABASE_RPC.REVOKE_WORKER_AREA,
} as const;

const CHANGE_RESULTS: readonly unknown[] = Object.values(
  WORKER_AREA_CHANGE_RESULT
);

const isWorkerAreaChangeResult = (
  value: unknown
): value is WorkerAreaChangeResult =>
  CHANGE_RESULTS.includes(value);

export const changeWorkerArea = async (
  supabase: ServerSupabaseClient,
  { area, intent, workerId }: WorkerAreaChange
): Promise<WorkerAreaChangeResult> => {
  const rpc = WORKER_AREA_RPC[intent];
  const { data, error } = await supabase.rpc(rpc, {
    target_area: area,
    target_worker: workerId,
  });

  throwIfSupabaseError(error, rpc);

  return isWorkerAreaChangeResult(data)
    ? data
    : WORKER_AREA_CHANGE_RESULT.FAILED;
};
