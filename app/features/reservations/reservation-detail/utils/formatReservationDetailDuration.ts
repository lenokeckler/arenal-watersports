import { RESERVATION_DETAIL_COPY } from "../constants/ReservationDetailCopy.constants";
import { RESERVATION_DETAIL_TIME } from "../constants/ReservationDetailPresentation.constants";

export const formatReservationDetailDuration = (
  durationMinutes: number
): string => {
  const hours = Math.floor(
    durationMinutes / RESERVATION_DETAIL_TIME.HOUR_MINUTES
  );
  const minutes =
    durationMinutes % RESERVATION_DETAIL_TIME.HOUR_MINUTES;

  if (minutes === RESERVATION_DETAIL_TIME.ZERO_REMAINDER) {
    return `${hours}${RESERVATION_DETAIL_COPY.HOURS_SUFFIX}`;
  }

  if (hours === RESERVATION_DETAIL_TIME.ZERO_REMAINDER) {
    return `${minutes}${RESERVATION_DETAIL_COPY.MINUTES_SUFFIX}`;
  }

  return `${hours}${RESERVATION_DETAIL_COPY.HOURS_SUFFIX} ${minutes}${RESERVATION_DETAIL_COPY.MINUTES_SUFFIX}`;
};
