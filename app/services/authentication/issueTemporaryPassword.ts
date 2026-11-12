import {
  WORKER_ACCOUNT_RESULT,
  type WorkerAccountResult,
} from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { generateTemporaryPassword } from "@/app/services/worker-registration/generateTemporaryPassword";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { TemporaryPasswordGrant } from "./models/TemporaryPasswordGrant.type";
import type { TemporaryPasswordPreparation } from "./models/TemporaryPasswordPreparation.type";
import { setWorkerPassword } from "./setWorkerPassword";

const RESULTS: readonly unknown[] = Object.values(
  WORKER_ACCOUNT_RESULT
);

const isWorkerAccountResult = (
  value: unknown
): value is WorkerAccountResult => RESULTS.includes(value);

export const issueTemporaryPassword = async (
  supabase: ServerSupabaseClient,
  preparation: TemporaryPasswordPreparation,
  workerId: string
): Promise<TemporaryPasswordGrant> => {
  const { data, error } = await supabase.rpc(preparation, {
    target_worker: workerId,
  });

  throwIfSupabaseError(error, preparation);

  if (data !== WORKER_ACCOUNT_RESULT.READY) {
    return {
      ok: false,
      result: isWorkerAccountResult(data)
        ? data
        : WORKER_ACCOUNT_RESULT.FAILED,
    };
  }

  const temporaryPassword = generateTemporaryPassword();
  const passwordError = await setWorkerPassword(
    workerId,
    temporaryPassword
  );

  return passwordError
    ? { ok: false, result: WORKER_ACCOUNT_RESULT.FAILED }
    : { ok: true, temporaryPassword };
};
