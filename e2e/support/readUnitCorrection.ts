import type { SupabaseClient } from "@supabase/supabase-js";
import {
  E2E_DISPATCH_SHEET_ERROR,
  E2E_DISPATCH_SHEET_TABLE,
} from "../constants/E2eDispatchSheet.constants";
import { failE2eOperation } from "./failE2eOperation";
import type { UnitCorrectionState } from "./models/DispatchSheetFixture.interface";

export const readUnitCorrection = async (
  supabase: SupabaseClient,
  code: string
): Promise<UnitCorrectionState> => {
  const unit = await supabase
    .from(E2E_DISPATCH_SHEET_TABLE.UNITS)
    .select(
      "id, fuel_max, fuel_level, usage_total, impact_count, status"
    )
    .eq("code", code)
    .single();

  if (unit.error) {
    return failE2eOperation(
      E2E_DISPATCH_SHEET_ERROR.OPERATION_READ_CORRECTION,
      unit.error.message
    );
  }

  const corrections = await supabase
    .from(E2E_DISPATCH_SHEET_TABLE.UNIT_CORRECTIONS)
    .select("created_by, previous, corrected")
    .eq("unit_id", unit.data.id);

  if (corrections.error) {
    return failE2eOperation(
      E2E_DISPATCH_SHEET_ERROR.OPERATION_READ_CORRECTION,
      corrections.error.message
    );
  }

  return {
    corrections: (corrections.data ?? []).map((row) => ({
      corrected: row.corrected,
      createdBy: row.created_by,
      previous: row.previous,
    })),
    fuelLevel: unit.data.fuel_level,
    fuelMax: unit.data.fuel_max,
    impactCount: unit.data.impact_count,
    status: unit.data.status,
    usageTotal: Number(unit.data.usage_total),
  };
};
