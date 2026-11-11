import { CUSTOM_COMBO_PRICING_MAX_DURATION_MINUTES } from "../constants/CustomComboPricing.constants";
import { getReservationDurationMinutes } from "./validateReservationSchedule";

export const isValidCustomComboPricingDuration = (
  durationHours: number
): boolean => {
  const durationMinutes =
    getReservationDurationMinutes(durationHours);

  return (
    durationMinutes !== null &&
    durationMinutes <=
      CUSTOM_COMBO_PRICING_MAX_DURATION_MINUTES
  );
};
