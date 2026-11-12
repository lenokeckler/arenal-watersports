import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_CHARGE_ERROR } from "../constants/ReservationChargeError.constants";
import { RESERVATION_CHARGE_QUERY } from "../constants/ReservationChargeQuery.constants";
import type { ReservationChargeCommand } from "../models/ReservationChargeCommand.interface";
import type { ReservationChargeRecorded } from "../models/ReservationChargeRecorded.interface";
import { mapReservationChargeRecorded } from "../utils/mapReservationChargeRecorded";

export const recordReservationCharge = async (
  command: ReservationChargeCommand
): Promise<ReservationChargeRecorded> => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.rpc(
    RESERVATION_CHARGE_QUERY.RPC.RECORD,
    {
      p_payload: {
        amount: command.amount,
        currency: command.currency,
        payment_method: command.paymentMethod,
        reservation_id: command.reservationId,
      },
    }
  );

  throwIfSupabaseError(
    error,
    RESERVATION_CHARGE_ERROR.OPERATION.RECORD
  );

  const [row] = data ?? [];

  if (!row) {
    throw new Error(
      RESERVATION_CHARGE_ERROR.OPERATION.MISSING_CHARGE
    );
  }

  return mapReservationChargeRecorded(row);
};
