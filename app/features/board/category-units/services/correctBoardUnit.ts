import { getOperationsSupabaseClient } from "@/app/services/operations/getOperationsSupabaseClient";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import {
  CATEGORY_UNIT_DATABASE_ERROR,
  CATEGORY_UNIT_UPDATE_ERROR,
  CATEGORY_UNIT_UPDATE_STATUS,
} from "../constants/CategoryUnits.constants";
import type { BoardUnitCorrectionInput } from "../models/BoardUnitCorrectionInput.interface";
import type { BoardUnitUpdateResult } from "../models/BoardUnitUpdateResult.interface";
import { validateBoardUnitCorrectionInput } from "../utils/validateBoardUnitCorrectionInput";

export const correctBoardUnit = async (
  input: BoardUnitCorrectionInput
): Promise<BoardUnitUpdateResult> => {
  validateBoardUnitCorrectionInput(input);

  const supabase = await getOperationsSupabaseClient();
  const { error } = await supabase.rpc(
    "correct_unit_readings",
    {
      p_fuel_level: input.fuelLevel,
      p_fuel_max: input.fuelMax,
      p_impact_count: input.impactCount,
      p_status: input.status,
      p_unit_id: input.unitId,
      p_usage_total: input.usageTotal,
    }
  );

  if (!error) {
    return { status: CATEGORY_UNIT_UPDATE_STATUS.UPDATED };
  }

  if (
    error.code ===
    CATEGORY_UNIT_DATABASE_ERROR.NOTHING_TO_CORRECT
  ) {
    return {
      status: CATEGORY_UNIT_UPDATE_STATUS.UNCHANGED,
    };
  }

  if (
    error.code ===
    CATEGORY_UNIT_DATABASE_ERROR.ALREADY_CLOSED
  ) {
    return {
      status: CATEGORY_UNIT_UPDATE_STATUS.NOT_CORRECTABLE,
    };
  }

  if (
    error.code ===
    CATEGORY_UNIT_DATABASE_ERROR.INVALID_VALUE
  ) {
    return { status: CATEGORY_UNIT_UPDATE_STATUS.INVALID };
  }

  throw new SupabaseQueryError(
    CATEGORY_UNIT_UPDATE_ERROR.CORRECT_UNIT,
    error
  );
};
