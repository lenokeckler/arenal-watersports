import type { SupabaseClient } from "@supabase/supabase-js";
import {
  E2E_DISPATCH_SHEET_ERROR,
  E2E_DISPATCH_SHEET_TABLE,
} from "../constants/E2eDispatchSheet.constants";
import { E2E_MAINTENANCE_SEED } from "../constants/E2eMaintenance.constants";
import { failE2eOperation } from "./failE2eOperation";

export const makeMaintenanceNeeds = async (
  supabase: SupabaseClient,
  unitCodes: string[]
): Promise<void> => {
  const [overUnit, damagedUnit] = unitCodes;
  const over = await supabase
    .from(E2E_DISPATCH_SHEET_TABLE.UNITS)
    .update({
      next_oil_change_at: E2E_MAINTENANCE_SEED.THRESHOLD,
      usage_total: E2E_MAINTENANCE_SEED.ACCUMULATED,
    })
    .eq("code", overUnit);
  const damaged = await supabase
    .from(E2E_DISPATCH_SHEET_TABLE.UNITS)
    .update({ status: E2E_MAINTENANCE_SEED.DAMAGED_STATUS })
    .eq("code", damagedUnit);
  const failure = over.error ?? damaged.error;

  if (failure) {
    return failE2eOperation(
      E2E_DISPATCH_SHEET_ERROR.OPERATION_MAKE_MAINTENANCE,
      failure.message
    );
  }

  return undefined;
};
