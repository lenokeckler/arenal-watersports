import { RESERVATION_RPC } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_SERVICE_OPERATION } from "../constants/ReservationServiceOperation.constants";
import type { ValidatedCustomComboReservationInput } from "../models/ValidatedCustomComboReservationInput.interface";
import { mapCustomComboRpcItems } from "../utils/mapCustomComboRpcItems";

export const createCustomComboReservation = async (
  input: ValidatedCustomComboReservationInput
): Promise<string> => {
  const supabase = await createServerSupabaseClient();
  const { data: reservationId, error } = await supabase.rpc(
    RESERVATION_RPC.CREATE_CUSTOM_COMBO,
    {
      p_payload: {
        agreed_amount_crc: input.agreedAmountCrc,
        agreed_amount_usd: input.agreedAmountUsd,
        customer_name: input.customerName,
        date: input.date,
        duration_minutes: input.durationMinutes,
        guide_ids: input.guideIds,
        items: mapCustomComboRpcItems(input.items),
        people_count: input.peopleCount,
        time: input.time,
      },
    }
  );

  throwIfSupabaseError(
    error,
    RESERVATION_SERVICE_OPERATION.CREATE_CUSTOM_COMBO
  );

  if (!reservationId) {
    throw new Error(
      RESERVATION_SERVICE_OPERATION.MISSING_CREATED_ID
    );
  }

  return reservationId;
};
