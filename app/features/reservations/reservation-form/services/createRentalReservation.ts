import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_SERVICE_OPERATION } from "../constants/ReservationServiceOperation.constants";
import type { ValidatedReservationFormInput } from "../models/ValidatedReservationFormInput.interface";
import { buildReservationEquipmentPayload } from "../utils/buildReservationEquipmentPayload";

export const createRentalReservation = async (
  input: ValidatedReservationFormInput
): Promise<string> => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.rpc(
    "create_rental_reservation",
    {
      p_payload: {
        customer_name: input.customerName,
        date: input.date,
        duration_minutes: input.durationMinutes,
        people_count: input.peopleCount,
        time: input.time,
        ...buildReservationEquipmentPayload(
          input.equipmentCommitment
        ),
      },
    }
  );

  throwIfSupabaseError(
    error,
    RESERVATION_SERVICE_OPERATION.CREATE_RENTAL
  );

  if (!data) {
    throw new Error(
      RESERVATION_SERVICE_OPERATION.MISSING_CREATED_ID
    );
  }

  return data;
};
