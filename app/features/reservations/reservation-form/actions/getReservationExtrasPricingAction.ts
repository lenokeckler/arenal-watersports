"use server";

import type { ReservationExtrasPricingActionResult } from "../models/ReservationExtrasPricingActionResult.type";
import { RESERVATION_EXTRAS_PRICING_COPY } from "../constants/ReservationExtrasPricingCopy.constants";
import { getReservationExtrasPricing } from "../services/getReservationExtrasPricing";
import { isReservationExtrasPricingInput } from "../utils/isReservationExtrasPricingInput";

export const getReservationExtrasPricingAction = async (
  input: unknown
): Promise<ReservationExtrasPricingActionResult> => {
  if (!isReservationExtrasPricingInput(input)) {
    return {
      message:
        RESERVATION_EXTRAS_PRICING_COPY.INVALID_INPUT,
      ok: false,
    };
  }
  return {
    ok: true,
    pricing: await getReservationExtrasPricing(input),
  };
};
