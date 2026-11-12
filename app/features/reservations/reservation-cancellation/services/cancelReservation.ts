import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_CANCELLATION_ERROR } from "../constants/ReservationCancellationError.constants";
import { RESERVATION_CANCELLATION_QUERY } from "../constants/ReservationCancellationQuery.constants";
import type { ReservationCancellationInput } from "../models/ReservationCancellationInput.interface";

export const cancelReservation = async (
  input: ReservationCancellationInput
): Promise<string> => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.rpc(
    RESERVATION_CANCELLATION_QUERY.RPC,
    {
      p_payload: {
        cause: input.cause,
        expected_updated_at: input.expectedUpdatedAt,
        reason: input.reason,
        reservation_id: input.reservationId,
      },
    }
  );

  throwIfSupabaseError(
    error,
    RESERVATION_CANCELLATION_ERROR.OPERATION.CANCEL
  );

  if (!data) {
    throw new Error(
      RESERVATION_CANCELLATION_ERROR.OPERATION
        .MISSING_RESERVATION
    );
  }

  return data;
};
