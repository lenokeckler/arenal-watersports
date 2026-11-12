import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_SERVICE_OPERATION } from "../constants/ReservationServiceOperation.constants";
import type { ValidatedReservationEditInput } from "../models/ValidatedReservationEditInput.interface";
import { buildReservationEquipmentPayload } from "../utils/buildReservationEquipmentPayload";

export const updateReservation = async (
  input: ValidatedReservationEditInput
): Promise<string> => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.rpc(
    RESERVATION_SERVICE_OPERATION.UPDATE_RPC,
    {
      p_payload: {
        reservation_id: input.reservationId,
        people_count: input.peopleCount,
        time: input.time,
        duration_minutes: input.durationMinutes,
        expected_updated_at: input.expectedUpdatedAt,
        ...buildReservationEquipmentPayload(
          input.equipmentCommitment
        ),
      },
    }
  );

  throwIfSupabaseError(
    error,
    RESERVATION_SERVICE_OPERATION.UPDATE
  );

  if (!data) {
    throw new Error(
      RESERVATION_SERVICE_OPERATION.MISSING_UPDATED_ID
    );
  }

  return data;
};
