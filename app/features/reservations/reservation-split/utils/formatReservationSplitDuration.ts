import { RESERVATION_SPLIT_MINUTES_PER_HOUR } from "../constants/ReservationSplitUi.constants";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";

export const formatReservationSplitDuration = (
  durationMinutes: number
): string =>
  RESERVATION_SPLIT_UI_COPY.DURATION_HOURS(
    durationMinutes / RESERVATION_SPLIT_MINUTES_PER_HOUR
  );
