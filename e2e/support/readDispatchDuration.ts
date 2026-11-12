import type { SupabaseClient } from "@supabase/supabase-js";
import {
  E2E_DISPATCH_SHEET_ERROR,
  E2E_DISPATCH_SHEET_TABLE,
} from "../constants/E2eDispatchSheet.constants";
import { failE2eOperation } from "./failE2eOperation";
import type { DispatchDurationState } from "./models/DispatchSheetFixture.interface";

export const readDispatchDuration = async (
  supabase: SupabaseClient,
  reservationId: string
): Promise<DispatchDurationState> => {
  const dispatch = await supabase
    .from(E2E_DISPATCH_SHEET_TABLE.DISPATCHES)
    .select("duration_minutes, extended_minutes")
    .eq("reservation_id", reservationId)
    .single();

  if (dispatch.error) {
    return failE2eOperation(
      E2E_DISPATCH_SHEET_ERROR.OPERATION_READ_DURATION,
      dispatch.error.message
    );
  }

  return {
    durationMinutes: dispatch.data.duration_minutes,
    extendedMinutes: dispatch.data.extended_minutes,
  };
};
