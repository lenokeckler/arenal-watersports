import type { SupabaseClient } from "@supabase/supabase-js";
import { LENGTH } from "@/app/constants";
import {
  E2E_RESERVATION_HISTORY_CHILD_TABLES,
  E2E_RESERVATION_HISTORY_COLUMN,
  E2E_RESERVATION_HISTORY_ERROR,
} from "../constants/E2eReservationHistory.constants";
import { E2E_SUPABASE_ERROR } from "../constants/E2eSupabase.constants";
import { failE2eOperation } from "./failE2eOperation";
import { removeE2eReservation } from "./removeE2eReservation";

export const removeReservationHistoryRecord = async (
  supabase: SupabaseClient,
  reservationId: string
): Promise<void> => {
  const failures: string[] = [];

  for (const table of E2E_RESERVATION_HISTORY_CHILD_TABLES) {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq(
        E2E_RESERVATION_HISTORY_COLUMN.RESERVATION_ID,
        reservationId
      );

    if (error) {
      failures.push(error.message);
    }
  }

  if (failures.length > LENGTH.ZERO) {
    failE2eOperation(
      E2E_RESERVATION_HISTORY_ERROR.REMOVE_OPERATION,
      failures.join(E2E_SUPABASE_ERROR.REASON_SEPARATOR)
    );
  }

  await removeE2eReservation(supabase, reservationId);
};
