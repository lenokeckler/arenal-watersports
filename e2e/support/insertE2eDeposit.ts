import type { SupabaseClient } from "@supabase/supabase-js";
import {
  DEPOSIT_STATUS,
  SUPABASE_TABLE,
} from "@/app/constants";
import {
  E2E_DEPOSIT_ERROR,
  E2E_DEPOSIT_RESOLUTION_AT,
} from "../constants/E2ePendingDeposits.constants";
import { failE2eOperation } from "./failE2eOperation";
import type { E2eDepositSeed } from "./models/E2eDepositSeed.interface";

export const insertE2eDeposit = async (
  supabase: SupabaseClient,
  workerId: string,
  reservationId: string,
  seed: E2eDepositSeed
) => {
  const isHeld = seed.status === DEPOSIT_STATUS.HELD;
  const { data, error } = await supabase
    .from(SUPABASE_TABLE.DEPOSITS)
    .insert({
      amount: seed.amount,
      created_by: workerId,
      currency: seed.currency,
      reservation_id: reservationId,
      resolved_at: isHeld
        ? null
        : E2E_DEPOSIT_RESOLUTION_AT,
      resolved_by: isHeld ? null : workerId,
      status: seed.status,
    })
    .select()
    .single();

  if (error) {
    return failE2eOperation(
      E2E_DEPOSIT_ERROR.OPERATION_INSERT_DEPOSIT,
      error.message
    );
  }

  return data;
};
