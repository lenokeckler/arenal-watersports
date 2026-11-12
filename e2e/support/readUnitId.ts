import type { SupabaseClient } from "@supabase/supabase-js";
import {
  E2E_DISPATCH_SHEET_ERROR,
  E2E_DISPATCH_SHEET_TABLE,
} from "../constants/E2eDispatchSheet.constants";
import { failE2eOperation } from "./failE2eOperation";

export const readUnitId = async (
  supabase: SupabaseClient,
  code: string
): Promise<string> => {
  const unit = await supabase
    .from(E2E_DISPATCH_SHEET_TABLE.UNITS)
    .select("id")
    .eq("code", code)
    .single();

  if (unit.error) {
    return failE2eOperation(
      E2E_DISPATCH_SHEET_ERROR.OPERATION_READ_UNIT,
      unit.error.message
    );
  }

  return unit.data.id;
};
