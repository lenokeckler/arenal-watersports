import { RESERVATION_SPLIT_MINUTES_PER_HOUR } from "../constants/ReservationSplitUi.constants";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";

export const formatReservationSplitDuration = (
  durationMinutes: number
): string => {
  const hours = Math.floor(
    durationMinutes / RESERVATION_SPLIT_MINUTES_PER_HOUR
  );
  const minutes =
    durationMinutes % RESERVATION_SPLIT_MINUTES_PER_HOUR;

  if (minutes === 0) {
    return RESERVATION_SPLIT_UI_COPY.DURATION_HOURS(hours);
  }
  return hours === 0
    ? RESERVATION_SPLIT_UI_COPY.DURATION_MINUTES(minutes)
    : RESERVATION_SPLIT_UI_COPY.DURATION_HOURS_MINUTES(
        hours,
        minutes
      );
};
