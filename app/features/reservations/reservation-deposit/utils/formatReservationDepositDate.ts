import { RESERVATION_DEPOSIT_DATE_FORMAT } from "../constants/ReservationDepositUi.constants";

const dateFormat = new Intl.DateTimeFormat(
  RESERVATION_DEPOSIT_DATE_FORMAT.LOCALE,
  RESERVATION_DEPOSIT_DATE_FORMAT.OPTIONS
);

export const formatReservationDepositDate = (
  date: string
): string =>
  dateFormat.format(
    new Date(
      `${date}${RESERVATION_DEPOSIT_DATE_FORMAT.NOON_UTC_TIME}`
    )
  );
