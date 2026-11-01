import { RESERVATION_HISTORY_DATE_FORMAT } from "../constants/ReservationHistoryDateFormat.constants";

export const formatReservationHistoryDate = (
  instant: string
): string =>
  new Intl.DateTimeFormat(
    RESERVATION_HISTORY_DATE_FORMAT.LOCALE,
    RESERVATION_HISTORY_DATE_FORMAT.DATE_OPTIONS
  ).format(new Date(instant));
