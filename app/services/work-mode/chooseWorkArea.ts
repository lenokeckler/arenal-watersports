import {
  SUPABASE_RPC,
  WORK_MODE_RESULT,
  type WorkModeResult,
} from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { WorkArea } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";

const RESULTS: readonly unknown[] = Object.values(
  WORK_MODE_RESULT
);

const isWorkModeResult = (
  value: unknown
): value is WorkModeResult => RESULTS.includes(value);

export const chooseWorkArea = async (
  supabase: ServerSupabaseClient,
  area: WorkArea
): Promise<WorkModeResult> => {
  const { data, error } = await supabase.rpc(
    SUPABASE_RPC.CHOOSE_WORK_AREA,
    { target: area }
  );

  throwIfSupabaseError(
    error,
    SUPABASE_RPC.CHOOSE_WORK_AREA
  );

  return isWorkModeResult(data)
    ? data
    : WORK_MODE_RESULT.FAILED;
};
