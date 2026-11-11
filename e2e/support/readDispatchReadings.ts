import type { SupabaseClient } from "@supabase/supabase-js";
import {
  E2E_DISPATCH_SHEET_ERROR,
  E2E_DISPATCH_SHEET_TABLE,
} from "../constants/E2eDispatchSheet.constants";
import { failE2eOperation } from "./failE2eOperation";
import type { DispatchReadingsState } from "./models/DispatchSheetFixture.interface";

export const readDispatchReadings = async (
  supabase: SupabaseClient,
  reservationId: string,
  unitCodes: string[]
): Promise<DispatchReadingsState> => {
  const units = await supabase
    .from(E2E_DISPATCH_SHEET_TABLE.UNITS)
    .select("id, code, fuel_level, usage_total")
    .in("code", unitCodes);
  const items = await supabase
    .from(E2E_DISPATCH_SHEET_TABLE.ITEMS)
    .select("unit_id, fuel_out, usage_out")
    .eq("reservation_id", reservationId)
    .not("unit_id", "is", null);
  const failure = units.error ?? items.error;

  if (failure) {
    return failE2eOperation(
      E2E_DISPATCH_SHEET_ERROR.OPERATION_READ_READINGS,
      failure.message
    );
  }

  return Object.fromEntries(
    (units.data ?? []).map((unit) => {
      const item = (items.data ?? []).find(
        (row) => row.unit_id === unit.id
      );

      return [
        unit.code,
        {
          fuelLevel: unit.fuel_level,
          fuelOut: item?.fuel_out ?? null,
          usageOut: item?.usage_out ?? null,
          usageTotal: Number(unit.usage_total),
        },
      ];
    })
  );
};
