import type { SupabaseClient } from "@supabase/supabase-js";
import {
  E2E_INCOME_ERROR,
  E2E_INCOME_RESERVATION,
  E2E_INCOME_TABLE,
} from "../constants/E2eIncome.constants";
import { E2E_SUPABASE_COLUMN } from "../constants/E2eSupabase.constants";
import { failE2eOperation } from "./failE2eOperation";

export const insertIncomeReservation = async (
  supabase: SupabaseClient,
  workerId: string
): Promise<string> => {
  const { data, error } = await supabase
    .from(E2E_INCOME_TABLE.RESERVATIONS)
    .insert({
      created_by: workerId,
      customer_name: E2E_INCOME_RESERVATION.CUSTOMER_NAME,
      duration_minutes:
        E2E_INCOME_RESERVATION.DURATION_MINUTES,
      people_count: E2E_INCOME_RESERVATION.PEOPLE_COUNT,
      starts_at: E2E_INCOME_RESERVATION.STARTS_AT,
      type: E2E_INCOME_RESERVATION.TYPE,
      updated_by: workerId,
    })
    .select(E2E_SUPABASE_COLUMN.ID)
    .single();

  if (error) {
    return failE2eOperation(
      E2E_INCOME_ERROR.INSERT_RESERVATION,
      error.message
    );
  }

  return data.id;
};
