import type { SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_TABLE } from "@/app/constants";
import { E2E_DISPATCH_ERROR } from "../constants/E2eDispatchBoard.constants";
import { E2E_SUPABASE_COLUMN } from "../constants/E2eSupabase.constants";
import { failE2eOperation } from "./failE2eOperation";

export const removePendingDispatchReservations = async (
  supabase: SupabaseClient,
  reservationIds: string[]
): Promise<void> => {
  const { error } = await supabase
    .from(SUPABASE_TABLE.RESERVATIONS)
    .delete()
    .in(E2E_SUPABASE_COLUMN.ID, reservationIds);

  if (error) {
    failE2eOperation(
      E2E_DISPATCH_ERROR.OPERATION_REMOVE,
      error.message
    );
  }
};
