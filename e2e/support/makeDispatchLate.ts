import type { SupabaseClient } from "@supabase/supabase-js";
import {
  E2E_DISPATCH_LATE,
  E2E_DISPATCH_SHEET_ERROR,
  E2E_DISPATCH_SHEET_TABLE,
} from "../constants/E2eDispatchSheet.constants";
import { failE2eOperation } from "./failE2eOperation";

export const makeDispatchLate = async (
  supabase: SupabaseClient,
  reservationId: string,
  minutesLate: number
): Promise<void> => {
  const dispatch = await supabase
    .from(E2E_DISPATCH_SHEET_TABLE.DISPATCHES)
    .select("duration_minutes")
    .eq("reservation_id", reservationId)
    .single();

  if (dispatch.error) {
    return failE2eOperation(
      E2E_DISPATCH_SHEET_ERROR.OPERATION_MAKE_LATE,
      dispatch.error.message
    );
  }

  const departedAt = new Date(
    Date.now() -
      (dispatch.data.duration_minutes + minutesLate) *
        E2E_DISPATCH_LATE.MS_PER_MINUTE
  ).toISOString();
  const update = await supabase
    .from(E2E_DISPATCH_SHEET_TABLE.DISPATCHES)
    .update({ dispatched_at: departedAt })
    .eq("reservation_id", reservationId);

  if (update.error) {
    return failE2eOperation(
      E2E_DISPATCH_SHEET_ERROR.OPERATION_MAKE_LATE,
      update.error.message
    );
  }

  return undefined;
};
