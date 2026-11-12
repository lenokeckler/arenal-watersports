import { UUID_PATTERN } from "@/app/constants";
import { getOperationsSupabaseClient } from "@/app/services/operations/getOperationsSupabaseClient";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { CLOSE_GROUP_ERROR } from "../constants/CloseGroup.constants";
import type { GroupReturnUnit } from "../models/GroupReturnUnit.interface";

export const getGroupReturnUnits = async (
  dispatchId: string
): Promise<GroupReturnUnit[]> => {
  if (!UUID_PATTERN.test(dispatchId)) {
    throw new RangeError(CLOSE_GROUP_ERROR.INVALID_INPUT);
  }

  const supabase = await getOperationsSupabaseClient();
  const { data, error } = await supabase.rpc(
    "dispatch_group_return_units",
    { p_dispatch_id: dispatchId }
  );
  throwIfSupabaseError(
    error,
    CLOSE_GROUP_ERROR.LOAD_RETURN_UNITS
  );

  return (data ?? []).map((row) => ({
    code: row.code,
    consumesFuel: row.consumes_fuel,
    fuelMax: row.fuel_max,
    fuelOut: row.fuel_out,
    unitId: row.unit_id,
    usageMetric: row.usage_metric,
    usageOut: row.usage_out,
  }));
};
