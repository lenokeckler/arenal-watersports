import type { SupabaseClient } from "@supabase/supabase-js";
import {
  E2E_DISPATCH_SHEET_ERROR,
  E2E_DISPATCH_SHEET_TABLE,
} from "../constants/E2eDispatchSheet.constants";
import { failE2eOperation } from "./failE2eOperation";

export const removeDamageReports = async (
  supabase: SupabaseClient,
  unitCodes: string[]
): Promise<void> => {
  const units = await supabase
    .from(E2E_DISPATCH_SHEET_TABLE.UNITS)
    .select("id")
    .in("code", unitCodes);
  const removal = await supabase
    .from(E2E_DISPATCH_SHEET_TABLE.DAMAGE_REPORTS)
    .delete()
    .in(
      "unit_id",
      (units.data ?? []).map((unit) => unit.id)
    );
  const failure = units.error ?? removal.error;

  if (failure) {
    return failE2eOperation(
      E2E_DISPATCH_SHEET_ERROR.OPERATION_REMOVE,
      failure.message
    );
  }

  return undefined;
};
