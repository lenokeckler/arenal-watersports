import { UUID_PATTERN } from "@/app/constants";
import { getOperationsSupabaseClient } from "@/app/services/operations/getOperationsSupabaseClient";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import {
  CATEGORY_UNIT_MAINTENANCE,
  CATEGORY_UNIT_UPDATE_ERROR,
  CATEGORY_UNIT_UPDATE_STATUS,
} from "../constants/CategoryUnits.constants";
import type { BoardUnitMaintenanceInput } from "../models/BoardUnitMaintenanceInput.interface";
import type { BoardUnitUpdateResult } from "../models/BoardUnitUpdateResult.interface";

const MAINTENANCE_RESULT_STATUS: Record<
  string,
  BoardUnitUpdateResult["status"]
> = {
  [CATEGORY_UNIT_MAINTENANCE.RESULT.CHANGED]:
    CATEGORY_UNIT_UPDATE_STATUS.UPDATED,
  [CATEGORY_UNIT_MAINTENANCE.RESULT.NO_CHANGE]:
    CATEGORY_UNIT_UPDATE_STATUS.UNCHANGED,
  [CATEGORY_UNIT_MAINTENANCE.RESULT.OCCUPIED]:
    CATEGORY_UNIT_UPDATE_STATUS.OCCUPIED,
};

export const setBoardUnitMaintenance = async ({
  inMaintenance,
  unitId,
}: BoardUnitMaintenanceInput): Promise<BoardUnitUpdateResult> => {
  if (!UUID_PATTERN.test(unitId)) {
    throw new RangeError(
      CATEGORY_UNIT_UPDATE_ERROR.INVALID_INPUT
    );
  }

  const supabase = await getOperationsSupabaseClient();
  const { data, error } = await supabase.rpc(
    CATEGORY_UNIT_MAINTENANCE.RPC,
    { in_maintenance: inMaintenance, target_unit: unitId }
  );

  if (error) {
    throw new SupabaseQueryError(
      CATEGORY_UNIT_UPDATE_ERROR.SET_MAINTENANCE,
      error
    );
  }

  return {
    status:
      MAINTENANCE_RESULT_STATUS[data] ??
      CATEGORY_UNIT_UPDATE_STATUS.NOT_CORRECTABLE,
  };
};
