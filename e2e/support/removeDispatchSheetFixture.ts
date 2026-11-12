import type { SupabaseClient } from "@supabase/supabase-js";
import {
  E2E_DISPATCH_SHEET_ERROR,
  E2E_DISPATCH_SHEET_TABLE,
} from "../constants/E2eDispatchSheet.constants";
import { E2E_SUPABASE_COLUMN } from "../constants/E2eSupabase.constants";
import { failE2eOperation } from "./failE2eOperation";

const RESERVATION_ID_COLUMN = "reservation_id";

export const removeDispatchSheetFixture = async (
  supabase: SupabaseClient,
  reservationId: string
): Promise<void> => {
  const results = [
    await supabase
      .from(E2E_DISPATCH_SHEET_TABLE.DAMAGE_REPORTS)
      .delete()
      .eq(RESERVATION_ID_COLUMN, reservationId),
    await supabase
      .from(E2E_DISPATCH_SHEET_TABLE.ITEMS)
      .delete()
      .eq(RESERVATION_ID_COLUMN, reservationId),
    await supabase
      .from(E2E_DISPATCH_SHEET_TABLE.DISPATCHES)
      .delete()
      .eq(RESERVATION_ID_COLUMN, reservationId),
    await supabase
      .from(E2E_DISPATCH_SHEET_TABLE.RESERVATIONS)
      .delete()
      .eq(E2E_SUPABASE_COLUMN.ID, reservationId),
  ];
  const failure = results.find((result) => result.error);

  if (failure?.error) {
    failE2eOperation(
      E2E_DISPATCH_SHEET_ERROR.OPERATION_REMOVE,
      failure.error.message
    );
  }
};
