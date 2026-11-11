import { getOperationsSupabaseClient } from "@/app/services/operations/getOperationsSupabaseClient";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import {
  ADJUST_DURATION_STATUS,
  OUT_ON_WATER_DATABASE_ERROR,
  OUT_ON_WATER_ERROR,
} from "../constants/OutOnWater.constants";
import type { AdjustDurationInput } from "../models/AdjustDurationInput.interface";
import type { AdjustDurationResult } from "../models/AdjustDurationResult.interface";
import { validateAdjustDurationInput } from "../utils/validateAdjustDurationInput";

export const adjustDispatchDuration = async (
  input: AdjustDurationInput
): Promise<AdjustDurationResult> => {
  validateAdjustDurationInput(input);

  const supabase = await getOperationsSupabaseClient();
  const { error } = await supabase.rpc(
    "adjust_dispatch_duration",
    {
      p_dispatch_id: input.dispatchId,
      p_duration_minutes: input.durationMinutes,
    }
  );

  if (!error) {
    return { status: ADJUST_DURATION_STATUS.ADJUSTED };
  }

  if (
    error.code ===
    OUT_ON_WATER_DATABASE_ERROR.ALREADY_CLOSED
  ) {
    return {
      status: ADJUST_DURATION_STATUS.ALREADY_CLOSED,
    };
  }

  if (
    error.code ===
    OUT_ON_WATER_DATABASE_ERROR.INVALID_DURATION
  ) {
    return { status: ADJUST_DURATION_STATUS.INVALID };
  }

  throw new SupabaseQueryError(
    OUT_ON_WATER_ERROR.ADJUST_DURATION,
    error
  );
};
