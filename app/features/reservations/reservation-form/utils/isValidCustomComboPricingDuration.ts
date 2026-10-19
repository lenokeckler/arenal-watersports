import { RESERVATION_SCHEDULE } from "../constants/ReservationSchedule.constants";
import { CUSTOM_COMBO_PRICING_MAX_DURATION_MINUTES } from "../constants/CustomComboPricing.constants";
import { isValidReservationDuration } from "./validateReservationSchedule";

export const isValidCustomComboPricingDuration = (
  durationHours: number
): boolean =>
  isValidReservationDuration(durationHours) &&
  durationHours * RESERVATION_SCHEDULE.MINUTES_PER_HOUR <=
    CUSTOM_COMBO_PRICING_MAX_DURATION_MINUTES;
