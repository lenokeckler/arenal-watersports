import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_SERVICE_OPERATION } from "../constants/ReservationServiceOperation.constants";
import { RESERVATION_EQUIPMENT_COMMITMENT_TYPE } from "../constants/ReservationEquipmentCommitmentType.constants";
import type { ValidatedReservationFormInput } from "../models/ValidatedReservationFormInput.interface";

export const createRentalReservation = async (
  input: ValidatedReservationFormInput
): Promise<string> => {
  const supabase = await createServerSupabaseClient();
  const equipmentCommitment = input.equipmentCommitment;
  const equipmentCommitmentPayload =
    equipmentCommitment.kind ===
    RESERVATION_EQUIPMENT_COMMITMENT_TYPE.CATEGORY
      ? {
          category_id: equipmentCommitment.categoryId,
          quantity: equipmentCommitment.quantity,
        }
      : { unit_id: equipmentCommitment.unitId };
  const { data, error } = await supabase.rpc(
    "create_rental_reservation",
    {
      p_payload: {
        customer_name: input.customerName,
        date: input.date,
        duration_minutes: input.durationMinutes,
        guide_ids: input.guideIds ?? [],
        people_count: input.peopleCount,
        reservation_type: input.reservationType,
        time: input.time,
        ...equipmentCommitmentPayload,
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
