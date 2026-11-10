import { RESERVATION_POSTPONEMENT_DATE_FORMAT } from "../constants/ReservationPostponementUi.constants";

const dateFormat = new Intl.DateTimeFormat(
  RESERVATION_POSTPONEMENT_DATE_FORMAT.LOCALE,
  RESERVATION_POSTPONEMENT_DATE_FORMAT.OPTIONS
);

export const formatReservationPostponementDate = (
  date: string
): string =>
  dateFormat.format(
    new Date(
      `${date}${RESERVATION_POSTPONEMENT_DATE_FORMAT.NOON_UTC_TIME}`
    )
  );
