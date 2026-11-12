"use server";

import { SUPABASE_RPC } from "@/app/constants";
import { requireInventoryAccess } from "@/app/services/operations/inventory/requireInventoryAccess";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import {
  INVENTORY_UNIT_CONDITION_RESULT,
  type InventoryUnitConditionResult,
} from "../constants/InventoryUnitCondition.constants";
import { isInventoryUnitConditionResult } from "../utils/isInventoryUnitConditionResult";
import { isInventoryUnitConditionStatus } from "../utils/isInventoryUnitConditionStatus";

export const submitInventoryUnitCondition = async (
  unitId: string,
  status: string
): Promise<InventoryUnitConditionResult> => {
  if (!isInventoryUnitConditionStatus(status)) {
    return INVENTORY_UNIT_CONDITION_RESULT.INVALID_STATUS;
  }

  const supabase = await requireInventoryAccess();
  const { data, error } = await supabase.rpc(
    SUPABASE_RPC.SET_UNIT_CONDITION,
    { new_status: status, target_unit: unitId }
  );

  throwIfSupabaseError(
    error,
    SUPABASE_RPC.SET_UNIT_CONDITION
  );

  return isInventoryUnitConditionResult(data)
    ? data
    : INVENTORY_UNIT_CONDITION_RESULT.FAILED;
};
