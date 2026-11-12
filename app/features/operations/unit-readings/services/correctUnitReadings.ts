import { getOperationsSupabaseClient } from "@/app/services/operations/getOperationsSupabaseClient";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import {
  UNIT_READINGS_DATABASE_ERROR,
  UNIT_READINGS_ERROR,
  UNIT_READINGS_RESULT,
} from "../constants/UnitReadings.constants";
import type { UnitCorrectionInput } from "../models/UnitCorrectionInput.interface";
import type { UnitCorrectionResult } from "../models/UnitCorrectionResult.interface";
import { validateUnitCorrectionInput } from "../utils/validateUnitCorrectionInput";

export const correctUnitReadings = async (
  input: UnitCorrectionInput
): Promise<UnitCorrectionResult> => {
  validateUnitCorrectionInput(input);

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
    return { status: UNIT_READINGS_RESULT.CORRECTED };
  }

  if (
    error.code ===
    UNIT_READINGS_DATABASE_ERROR.NOTHING_TO_CORRECT
  ) {
    return { status: UNIT_READINGS_RESULT.UNCHANGED };
  }

  if (
    error.code ===
    UNIT_READINGS_DATABASE_ERROR.UNIT_NOT_CORRECTABLE
  ) {
    return { status: UNIT_READINGS_RESULT.NOT_CORRECTABLE };
  }

  if (
    error.code ===
    UNIT_READINGS_DATABASE_ERROR.INVALID_VALUE
  ) {
    return { status: UNIT_READINGS_RESULT.INVALID };
  }

  throw new SupabaseQueryError(
    UNIT_READINGS_ERROR.CORRECT_UNIT,
    error
  );
};
