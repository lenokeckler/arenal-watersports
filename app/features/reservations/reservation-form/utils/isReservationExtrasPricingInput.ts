import { RESERVATION_SCHEDULE } from "../constants/ReservationSchedule.constants";
import { RESERVATION_EXTRA } from "../constants/ReservationExtra.constants";
import { CUSTOM_COMBO_PRICING_MAX_DURATION_MINUTES } from "../constants/CustomComboPricing.constants";
import { RESERVATION_EXTRAS_PRICING } from "../constants/ReservationExtrasPricing.constants";
import { TYPE_OF } from "@/app/constants";
import type { ReservationExtrasPricingInput } from "../models/ReservationExtrasPricingInput.interface";
import type { ReservationExtrasPricingType } from "../models/ReservationExtrasPricingType.type";
import { isValidReservationDuration } from "./validateReservationSchedule";
import { isUniqueReservationExtraIds } from "./isUniqueReservationExtraIds";

const isRecord = (
  value: unknown
): value is Record<string, unknown> =>
  typeof value === TYPE_OF.OBJECT &&
  value !== null &&
  !Array.isArray(value);

const isString = (value: unknown): value is string =>
  typeof value === TYPE_OF.STRING;

const isNumber = (value: unknown): value is number =>
  typeof value === TYPE_OF.NUMBER;

const isValidDuration = (
  durationHours: unknown
): durationHours is number =>
  isNumber(durationHours) &&
  isValidReservationDuration(durationHours) &&
  durationHours * RESERVATION_SCHEDULE.MINUTES_PER_HOUR <=
    CUSTOM_COMBO_PRICING_MAX_DURATION_MINUTES;

const isReservationExtrasPricingType = (
  value: unknown
): value is ReservationExtrasPricingType =>
  value ===
    RESERVATION_EXTRAS_PRICING.RESERVATION_TYPE.RENTAL ||
  value ===
    RESERVATION_EXTRAS_PRICING.RESERVATION_TYPE.TOUR;

export const isReservationExtrasPricingInput = (
  input: unknown
): input is ReservationExtrasPricingInput => {
  if (!isRecord(input)) {
    return false;
  }
  return (
    isValidDuration(input.durationHours) &&
    isUniqueReservationExtraIds(input.extraIds) &&
    isReservationExtrasPricingType(input.reservationType) &&
    isString(input.unitId) &&
    RESERVATION_EXTRA.UUID_PATTERN.test(input.unitId)
  );
};
