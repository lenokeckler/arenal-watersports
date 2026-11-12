import type { SupabaseClient } from "@supabase/supabase-js";
import { CHARGE_QUERY } from "@/app/constants";
import {
  E2E_CHARGE_ERROR,
  E2E_CHARGE_KIND,
} from "../constants/E2eDailyIncome.constants";
import { failE2eOperation } from "./failE2eOperation";
import type { E2eChargeSeed } from "./models/E2eChargeSeed.interface";

export const insertE2eCharge = async (
  supabase: SupabaseClient,
  workerId: string,
  reservationId: string,
  paymentMethod: string,
  seed: E2eChargeSeed
) => {
  const { data, error } = await supabase
    .from(CHARGE_QUERY.TABLE)
    .insert({
      amount: seed.amount,
      created_by: workerId,
      currency: seed.currency,
      kind: E2E_CHARGE_KIND,
      payment_method: paymentMethod,
      reservation_id: reservationId,
    })
    .select()
    .single();

  if (error) {
    return failE2eOperation(
      E2E_CHARGE_ERROR.OPERATION_INSERT_CHARGE,
      error.message
    );
  }

  return data;
};
