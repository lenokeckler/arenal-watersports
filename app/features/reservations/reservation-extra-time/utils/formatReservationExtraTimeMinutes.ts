import { TIME } from "@/app/constants";
import { RESERVATION_EXTRA_TIME_NO_MINUTES } from "../constants/ReservationExtraTimeUi.constants";
import { RESERVATION_EXTRA_TIME_UI_COPY as COPY } from "../constants/ReservationExtraTimeUiCopy.constants";

export const formatReservationExtraTimeMinutes = (
  totalMinutes: number
): string => {
  const hours = Math.floor(
    totalMinutes / TIME.UNITS.MINUTES_IN_HOUR
  );
  const minutes = totalMinutes % TIME.UNITS.MINUTES_IN_HOUR;

  if (hours === RESERVATION_EXTRA_TIME_NO_MINUTES) {
    return `${minutes}${COPY.MINUTES_SUFFIX}`;
  }
  if (minutes === RESERVATION_EXTRA_TIME_NO_MINUTES) {
    return `${hours}${COPY.HOURS_SUFFIX}`;
  }
  return `${hours}${COPY.HOURS_SUFFIX} ${minutes}${COPY.MINUTES_SUFFIX}`;
};
