import { TIME } from "@/app/constants";
import { RESERVATION_CHARGE_DURATION } from "../constants/ReservationChargeUi.constants";
import { RESERVATION_CHARGE_UI_COPY as COPY } from "../constants/ReservationChargeUiCopy.constants";

export const formatReservationChargeDuration = (
  durationMinutes: number
): string => {
  const hours = Math.floor(
    durationMinutes / TIME.UNITS.MINUTES_IN_HOUR
  );
  const minutes =
    durationMinutes % TIME.UNITS.MINUTES_IN_HOUR;

  if (
    minutes === RESERVATION_CHARGE_DURATION.ZERO_REMAINDER
  ) {
    return `${hours}${COPY.HOURS_SUFFIX}`;
  }

  if (
    hours === RESERVATION_CHARGE_DURATION.ZERO_REMAINDER
  ) {
    return `${minutes}${COPY.MINUTES_SUFFIX}`;
  }

  return `${hours}${COPY.HOURS_SUFFIX} ${minutes}${COPY.MINUTES_SUFFIX}`;
};
