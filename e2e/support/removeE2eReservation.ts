import type { SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_TABLE } from "@/app/constants";
import { E2E_DEPOSIT_ERROR } from "../constants/E2ePendingDeposits.constants";
import { E2E_SUPABASE_COLUMN } from "../constants/E2eSupabase.constants";
import { failE2eOperation } from "./failE2eOperation";

export const removeE2eReservation = async (
  supabase: SupabaseClient,
  reservationId: string
): Promise<void> => {
  const { error } = await supabase
    .from(SUPABASE_TABLE.RESERVATIONS)
    .delete()
    .eq(E2E_SUPABASE_COLUMN.ID, reservationId);

  if (error) {
    failE2eOperation(
      E2E_DEPOSIT_ERROR.OPERATION_REMOVE_RESERVATION,
      error.message
    );
  }
};
