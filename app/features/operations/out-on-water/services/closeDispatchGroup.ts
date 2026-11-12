import { getOperationsSupabaseClient } from "@/app/services/operations/getOperationsSupabaseClient";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import {
  CLOSE_GROUP_DATABASE_ERROR,
  CLOSE_GROUP_ERROR,
  CLOSE_GROUP_STATUS,
} from "../constants/CloseGroup.constants";
import type { CloseGroupInput } from "../models/CloseGroupInput.interface";
import type { CloseGroupResult } from "../models/CloseGroupResult.interface";
import { validateCloseGroupInput } from "../utils/validateCloseGroupInput";

export const closeDispatchGroup = async (
  input: CloseGroupInput
): Promise<CloseGroupResult> => {
  validateCloseGroupInput(input);

  const supabase = await getOperationsSupabaseClient();
  const { error } = await supabase.rpc(
    "close_dispatch_group",
    {
      p_arrived_at: input.arrivedAt,
      p_dispatch_id: input.dispatchId,
      p_returns: input.returns.map((value) => ({
        damage: value.damage && {
          cause: value.damage.cause,
          description: value.damage.description.trim(),
          impact_delta: value.damage.impactDelta,
        },
        fuel: value.fuel,
        maintenance: value.maintenance,
        unit_id: value.unitId,
        usage: value.usage,
      })),
    }
  );

  if (!error) {
    return { status: CLOSE_GROUP_STATUS.CLOSED };
  }

  if (
    error.code === CLOSE_GROUP_DATABASE_ERROR.ALREADY_CLOSED
  ) {
    return { status: CLOSE_GROUP_STATUS.ALREADY_CLOSED };
  }

  if (
    error.code ===
    CLOSE_GROUP_DATABASE_ERROR.INVALID_ARRIVAL
  ) {
    return { status: CLOSE_GROUP_STATUS.INVALID_ARRIVAL };
  }

  if (
    error.code ===
    CLOSE_GROUP_DATABASE_ERROR.INVALID_RETURNS
  ) {
    return { status: CLOSE_GROUP_STATUS.INVALID_RETURNS };
  }

  throw new SupabaseQueryError(
    CLOSE_GROUP_ERROR.CLOSE_GROUP,
    error
  );
};
