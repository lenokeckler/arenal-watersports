import { RESERVATION_EDIT_DATE_FORMAT } from "../constants/ReservationEditDateFormat.constants";

export const formatReservationEditDate = (
  date: string
): string =>
  new Intl.DateTimeFormat(
    RESERVATION_EDIT_DATE_FORMAT.LOCALE,
    RESERVATION_EDIT_DATE_FORMAT.OPTIONS
  ).format(
    new Date(
      `${date}${RESERVATION_EDIT_DATE_FORMAT.NOON_UTC_TIME}`
    )
  );
