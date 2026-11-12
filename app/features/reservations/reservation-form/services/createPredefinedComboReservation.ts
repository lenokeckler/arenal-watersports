import { RESERVATION_RPC } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_SERVICE_OPERATION } from "../constants/ReservationServiceOperation.constants";
import type { ValidatedPredefinedComboReservationInput } from "../models/ValidatedPredefinedComboReservationInput.interface";

export const createPredefinedComboReservation = async (
  input: ValidatedPredefinedComboReservationInput
): Promise<string> => {
  const supabase = await createServerSupabaseClient();
  const { data: reservationId, error } = await supabase.rpc(
    RESERVATION_RPC.CREATE_PREDEFINED_COMBO,
    {
      p_payload: {
        combo_id: input.comboId,
        customer_name: input.customerName,
        date: input.date,
        duration_minutes: input.durationMinutes,
        guide_ids: input.guideIds,
        people_count: input.peopleCount,
        time: input.time,
      },
    }
  );

  throwIfSupabaseError(
    error,
    RESERVATION_SERVICE_OPERATION.CREATE_PREDEFINED_COMBO
  );

  if (!reservationId) {
    throw new Error(
      RESERVATION_SERVICE_OPERATION.MISSING_CREATED_ID
    );
  }

  return reservationId;
};
