import { getOperationsSupabaseClient } from "@/app/services/operations/getOperationsSupabaseClient";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import {
  CATEGORY_UNIT_DATABASE_ERROR,
  CATEGORY_UNIT_UPDATE_ERROR,
  CATEGORY_UNIT_UPDATE_STATUS,
} from "../constants/CategoryUnits.constants";
import type { BoardUnitUpdateResult } from "../models/BoardUnitUpdateResult.interface";
import type { OpenDispatchUpdateInput } from "../models/OpenDispatchUpdateInput.interface";
import { validateOpenDispatchUpdateInput } from "../utils/validateOpenDispatchUpdateInput";

export const updateOpenDispatch = async (
  input: OpenDispatchUpdateInput
): Promise<BoardUnitUpdateResult> => {
  validateOpenDispatchUpdateInput(input);

  const supabase = await getOperationsSupabaseClient();
  const { error } = await supabase.rpc(
    "update_open_dispatch",
    {
      p_dispatch_id: input.dispatchId,
      p_dispatched_at: input.departureAt,
      p_radio_channel: input.radioChannel ?? undefined,
      p_returns_at: input.returnsAt,
    }
  );

  if (!error) {
    return { status: CATEGORY_UNIT_UPDATE_STATUS.UPDATED };
  }

  if (
    error.code ===
    CATEGORY_UNIT_DATABASE_ERROR.ALREADY_CLOSED
  ) {
    return {
      status: CATEGORY_UNIT_UPDATE_STATUS.ALREADY_CLOSED,
    };
  }

  if (
    error.code ===
    CATEGORY_UNIT_DATABASE_ERROR.INVALID_VALUE
  ) {
    return { status: CATEGORY_UNIT_UPDATE_STATUS.INVALID };
  }

  throw new SupabaseQueryError(
    CATEGORY_UNIT_UPDATE_ERROR.UPDATE_DISPATCH,
    error
  );
};
