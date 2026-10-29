import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_SERVICE_OPERATION } from "../constants/ReservationServiceOperation.constants";
import type { ValidatedReservationFormInput } from "../models/ValidatedReservationFormInput.interface";

export const createRentalReservation = async (
  input: ValidatedReservationFormInput
): Promise<string> => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.rpc(
    "create_rental_reservation",
    {
      p_category_id: input.categoryId,
      p_customer_name: input.customerName,
      p_date: input.date,
      p_duration_minutes: input.durationMinutes,
      p_people_count: input.peopleCount,
      p_quantity: input.quantity,
      p_time: input.time,
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
