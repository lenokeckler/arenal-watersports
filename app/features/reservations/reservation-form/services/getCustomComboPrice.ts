import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_SERVICE_OPERATION } from "../constants/ReservationServiceOperation.constants";
import type { CustomComboPricing } from "../models/CustomComboPricing.interface";
import type { CustomComboPricingInput } from "../models/CustomComboPricingInput.interface";
import { mapCustomComboRpcItems } from "../utils/mapCustomComboRpcItems";
import { RESERVATION_SCHEDULE } from "../constants/ReservationSchedule.constants";

export const getCustomComboPrice = async (
  input: CustomComboPricingInput
): Promise<CustomComboPricing> => {
  const supabase = await createServerSupabaseClient();
  const { data: pricingRows, error } = await supabase.rpc(
    "custom_combo_price",
    {
      p_items: mapCustomComboRpcItems(input.items),
      p_duration_minutes:
        input.durationHours *
        RESERVATION_SCHEDULE.MINUTES_PER_HOUR,
    }
  );

  throwIfSupabaseError(
    error,
    RESERVATION_SERVICE_OPERATION.LOAD_CUSTOM_COMBO_PRICE
  );

  const pricing = pricingRows?.[0];

  if (!pricing) {
    throw new Error(
      RESERVATION_SERVICE_OPERATION.MISSING_CUSTOM_COMBO_PRICE
    );
  }

  return {
    listAmountCrc: pricing.list_amount_crc,
    listAmountUsd: pricing.list_amount_usd,
  };
};
