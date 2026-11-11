import { RESERVATION_POSTPONEMENT_READING_LIMITS } from "../constants/ReservationPostponementReadingLimits.constants";
import { RESERVATION_POSTPONEMENT_READINGS_COPY as COPY } from "../constants/ReservationPostponementReadingsCopy.constants";

export const resolveReservationPostponementFuelCaption = (
  level: number,
  max: number
): string => {
  if (
    level ===
    RESERVATION_POSTPONEMENT_READING_LIMITS.EMPTY_FUEL
  ) {
    return COPY.FUEL_EMPTY;
  }
  return level === max
    ? COPY.FUEL_FULL
    : COPY.FUEL_LEVEL(level, max);
};
