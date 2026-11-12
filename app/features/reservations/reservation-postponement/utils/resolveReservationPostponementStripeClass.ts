import { RESERVATION_POSTPONEMENT_READING_LIMITS } from "../constants/ReservationPostponementReadingLimits.constants";
import { RESERVATION_POSTPONEMENT_STRIPE_CLASSES } from "../styles/ReservationPostponementReadings.styles";

export const resolveReservationPostponementStripeClass = (
  stripe: number,
  level: number,
  max: number
): string => {
  if (stripe >= level) {
    return RESERVATION_POSTPONEMENT_STRIPE_CLASSES.EMPTY;
  }
  return level / max <=
    RESERVATION_POSTPONEMENT_READING_LIMITS.LOW_FUEL_RATIO
    ? RESERVATION_POSTPONEMENT_STRIPE_CLASSES.LOW
    : RESERVATION_POSTPONEMENT_STRIPE_CLASSES.FILLED;
};
