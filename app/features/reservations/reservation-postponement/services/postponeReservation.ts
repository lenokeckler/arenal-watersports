import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_POSTPONEMENT_ERROR } from "../constants/ReservationPostponementError.constants";
import { RESERVATION_POSTPONEMENT_QUERY } from "../constants/ReservationPostponementQuery.constants";
import type { ReservationPostponementInput } from "../models/ReservationPostponementInput.interface";

export const postponeReservation = async (
  input: ReservationPostponementInput
): Promise<string> => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.rpc(
    RESERVATION_POSTPONEMENT_QUERY.RPC,
    {
      p_payload: {
        cause: input.cause,
        date: input.date,
        expected_updated_at: input.expectedUpdatedAt,
        readings: input.readings.map((reading) => ({
          fuel_in: reading.fuelIn ?? null,
          item_id: reading.itemId,
          usage_in: reading.usageIn ?? null,
        })),
        reason: input.reason,
        reservation_id: input.reservationId,
        time: input.time,
      },
    }
  );

  throwIfSupabaseError(
    error,
    RESERVATION_POSTPONEMENT_ERROR.OPERATION.POSTPONE
  );

  if (!data) {
    throw new Error(
      RESERVATION_POSTPONEMENT_ERROR.OPERATION
        .MISSING_RESERVATION
    );
  }

  return data;
};
