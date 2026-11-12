import { RESERVATION_SPLIT_DATE_FORMAT } from "../constants/ReservationSplitUi.constants";

const dateFormat = new Intl.DateTimeFormat(
  RESERVATION_SPLIT_DATE_FORMAT.LOCALE,
  RESERVATION_SPLIT_DATE_FORMAT.OPTIONS
);

export const formatReservationSplitDate = (
  date: string
): string =>
  dateFormat.format(
    new Date(
      `${date}${RESERVATION_SPLIT_DATE_FORMAT.NOON_UTC_TIME}`
    )
  );
