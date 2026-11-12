import { RESERVATION_SCHEDULE } from "../constants/ReservationSchedule.constants";
import { RESERVATION_SERVICE_OPERATION } from "../constants/ReservationServiceOperation.constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { ReservationExtrasPricing } from "../models/ReservationExtrasPricing.interface";
import type { ReservationExtrasPricingInput } from "../models/ReservationExtrasPricingInput.interface";
import { getAuthorizedReservationFormClient } from "./getAuthorizedReservationFormClient";

export const getReservationExtrasPricing = async (
  input: ReservationExtrasPricingInput
): Promise<ReservationExtrasPricing> => {
  const supabase =
    await getAuthorizedReservationFormClient();
  const { data, error } = await supabase.rpc(
    "reservation_extras_price_quote",
    {
      p_duration_minutes:
        input.durationHours *
        RESERVATION_SCHEDULE.MINUTES_PER_HOUR,
      p_extra_ids: input.extraIds,
      p_reservation_type: input.reservationType,
      p_unit_id: input.unitId,
    }
  );
  throwIfSupabaseError(
    error,
    RESERVATION_SERVICE_OPERATION.LOAD_EXTRAS_PRICING
  );
  const quote = data?.[0];
  if (!quote) {
    throw new Error(
      RESERVATION_SERVICE_OPERATION.MISSING_EXTRAS_PRICING
    );
  }
  return {
    hasBoatTariff: quote.has_boat_tariff,
    listAmountCrc: quote.list_amount_crc,
    listAmountUsd: quote.list_amount_usd,
  };
};
