import type { SupabaseClient } from "@supabase/supabase-js";
import {
  E2E_RESERVATION_HISTORY_CHILD_TABLES,
  E2E_RESERVATION_HISTORY_COLUMN,
  E2E_RESERVATION_HISTORY_ERROR,
} from "../constants/E2eReservationHistory.constants";
import { E2E_SUPABASE_TABLE } from "../constants/E2eSupabase.constants";
import { failE2eOperation } from "./failE2eOperation";

export const removeReservationHistoryRecord = async (
  supabase: SupabaseClient,
  reservationId: string
): Promise<void> => {
  for (const table of E2E_RESERVATION_HISTORY_CHILD_TABLES) {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq(
        E2E_RESERVATION_HISTORY_COLUMN.RESERVATION_ID,
        reservationId
      );

    if (error) {
      failE2eOperation(
        E2E_RESERVATION_HISTORY_ERROR.REMOVE_OPERATION,
        error.message
      );
    }
  }

  const { error } = await supabase
    .from(E2E_SUPABASE_TABLE.RESERVATIONS)
    .delete()
    .eq(E2E_RESERVATION_HISTORY_COLUMN.ID, reservationId);

  if (error) {
    failE2eOperation(
      E2E_RESERVATION_HISTORY_ERROR.REMOVE_OPERATION,
      error.message
    );
  }
};
