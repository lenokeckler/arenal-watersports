import { getOperationsSupabaseClient } from "@/app/services/operations/getOperationsSupabaseClient";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import {
  CATEGORY_UNIT_DATABASE_ERROR,
  CATEGORY_UNIT_RECEIVE,
  CATEGORY_UNIT_UPDATE_ERROR,
  CATEGORY_UNIT_UPDATE_STATUS,
} from "../constants/CategoryUnits.constants";
import type { BoardUnitReceiveInput } from "../models/BoardUnitReceiveInput.interface";
import type { BoardUnitUpdateResult } from "../models/BoardUnitUpdateResult.interface";
import { buildBoardUnitReturn } from "../utils/buildBoardUnitReturn";
import { validateBoardUnitReceiveInput } from "../utils/validateBoardUnitReceiveInput";

export const receiveBoardUnit = async (
  input: BoardUnitReceiveInput
): Promise<BoardUnitUpdateResult> => {
  validateBoardUnitReceiveInput(input);

  const supabase = await getOperationsSupabaseClient();
  const { error } = await supabase.rpc(
    CATEGORY_UNIT_RECEIVE.RPC,
    {
      p_arrived_at: new Date().toISOString(),
      p_return: buildBoardUnitReturn(input),
      p_unit_id: input.unitId,
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
      CATEGORY_UNIT_DATABASE_ERROR.INVALID_VALUE ||
    error.code ===
      CATEGORY_UNIT_DATABASE_ERROR.NOTHING_TO_CORRECT
  ) {
    return { status: CATEGORY_UNIT_UPDATE_STATUS.INVALID };
  }

  throw new SupabaseQueryError(
    CATEGORY_UNIT_UPDATE_ERROR.RECEIVE_UNIT,
    error
  );
};
