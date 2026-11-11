import type { SupabaseClient } from "@supabase/supabase-js";
import { STRING } from "@/app/constants";
import {
  E2E_DISPATCH_SHEET_ERROR,
  E2E_DISPATCH_SHEET_TABLE,
} from "../constants/E2eDispatchSheet.constants";
import { failE2eOperation } from "./failE2eOperation";
import type { DispatchSheetState } from "./models/DispatchSheetFixture.interface";

export const readDispatchSheetState = async (
  supabase: SupabaseClient,
  reservationId: string
): Promise<DispatchSheetState> => {
  const dispatches = await supabase
    .from(E2E_DISPATCH_SHEET_TABLE.DISPATCHES)
    .select("id, created_by")
    .eq("reservation_id", reservationId);
  const items = await supabase
    .from(E2E_DISPATCH_SHEET_TABLE.ITEMS)
    .select("id")
    .eq("reservation_id", reservationId)
    .not("unit_id", "is", null)
    .not("dispatch_id", "is", null);
  const reservation = await supabase
    .from(E2E_DISPATCH_SHEET_TABLE.RESERVATIONS)
    .select("status")
    .eq("id", reservationId)
    .single();
  const failure =
    dispatches.error ?? items.error ?? reservation.error;

  if (failure) {
    return failE2eOperation(
      E2E_DISPATCH_SHEET_ERROR.OPERATION_READ_STATE,
      failure.message
    );
  }

  const dispatchRows = dispatches.data ?? [];

  return {
    dispatchCount: dispatchRows.length,
    dispatchCreatedBy: dispatchRows[0]?.created_by ?? null,
    dispatchedUnitCount: (items.data ?? []).length,
    reservationStatus:
      reservation.data?.status ?? STRING.Empty,
  };
};
