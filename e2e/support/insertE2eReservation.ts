import type { SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_TABLE } from "@/app/constants";
import {
  E2E_DEPOSIT_ERROR,
  E2E_DEPOSIT_RESERVATION,
} from "../constants/E2ePendingDeposits.constants";
import { failE2eOperation } from "./failE2eOperation";

export const insertE2eReservation = async (
  supabase: SupabaseClient,
  workerId: string,
  customerName: string
) => {
  const { data, error } = await supabase
    .from(SUPABASE_TABLE.RESERVATIONS)
    .insert({
      created_by: workerId,
      customer_name: customerName,
      duration_minutes:
        E2E_DEPOSIT_RESERVATION.DURATION_MINUTES,
      people_count: E2E_DEPOSIT_RESERVATION.PEOPLE_COUNT,
      starts_at: E2E_DEPOSIT_RESERVATION.STARTS_AT,
      type: E2E_DEPOSIT_RESERVATION.TYPE,
      updated_by: workerId,
    })
    .select()
    .single();

  if (error) {
    return failE2eOperation(
      E2E_DEPOSIT_ERROR.OPERATION_INSERT_RESERVATION,
      error.message
    );
  }

  return data;
};
