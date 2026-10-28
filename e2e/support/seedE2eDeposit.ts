import type { SupabaseClient } from "@supabase/supabase-js";
import { DEPOSIT_STATUS } from "@/app/constants";
import {
  E2E_DEPOSIT_COLUMN,
  E2E_DEPOSIT_ERROR,
  E2E_DEPOSIT_RESERVATION,
  E2E_DEPOSIT_RESOLUTION_AT,
  E2E_DEPOSIT_TABLE,
} from "../constants/E2ePendingDeposits.constants";
import { buildE2eCustomerName } from "./buildE2eCustomerName";
import { failE2eOperation } from "./failE2eOperation";
import type { E2eDepositSeed } from "./models/E2eDepositSeed.interface";
import type { E2eSeededDeposit } from "./models/E2eSeededDeposit.interface";

export const seedE2eDeposit = async (
  supabase: SupabaseClient,
  workerId: string,
  seed: E2eDepositSeed
): Promise<E2eSeededDeposit> => {
  const customerName = buildE2eCustomerName();
  const { data: reservation, error: reservationError } =
    await supabase
      .from(E2E_DEPOSIT_TABLE.RESERVATIONS)
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

  if (reservationError) {
    return failE2eOperation(
      E2E_DEPOSIT_ERROR.OPERATION_INSERT_RESERVATION,
      reservationError.message
    );
  }

  const isHeld = seed.status === DEPOSIT_STATUS.HELD;
  const { data: deposit, error: depositError } =
    await supabase
      .from(E2E_DEPOSIT_TABLE.DEPOSITS)
      .insert({
        amount: seed.amount,
        created_by: workerId,
        currency: seed.currency,
        reservation_id: reservation.id,
        resolved_at: isHeld
          ? null
          : E2E_DEPOSIT_RESOLUTION_AT,
        resolved_by: isHeld ? null : workerId,
        status: seed.status,
      })
      .select()
      .single();

  if (depositError) {
    await supabase
      .from(E2E_DEPOSIT_TABLE.RESERVATIONS)
      .delete()
      .eq(E2E_DEPOSIT_COLUMN.ID, reservation.id);
    return failE2eOperation(
      E2E_DEPOSIT_ERROR.OPERATION_INSERT_DEPOSIT,
      depositError.message
    );
  }

  return {
    ...seed,
    customerName,
    depositId: deposit.id,
    reservationCode: reservation.code,
    reservationId: reservation.id,
  };
};
