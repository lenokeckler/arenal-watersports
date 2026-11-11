import { RESERVATION_CANCELLATION_DATE_FORMAT } from "../constants/ReservationCancellationUi.constants";

const dateFormat = new Intl.DateTimeFormat(
  RESERVATION_CANCELLATION_DATE_FORMAT.LOCALE,
  RESERVATION_CANCELLATION_DATE_FORMAT.OPTIONS
);

export const formatReservationCancellationDate = (
  date: string
): string =>
  dateFormat.format(
    new Date(
      `${date}${RESERVATION_CANCELLATION_DATE_FORMAT.NOON_UTC_TIME}`
    )
  );
