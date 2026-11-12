import { RESERVATION_CHARGE_DATE_FORMAT } from "../constants/ReservationChargeUi.constants";

const dateFormat = new Intl.DateTimeFormat(
  RESERVATION_CHARGE_DATE_FORMAT.LOCALE,
  RESERVATION_CHARGE_DATE_FORMAT.OPTIONS
);

export const formatReservationChargeDate = (
  date: string
): string =>
  dateFormat.format(
    new Date(
      `${date}${RESERVATION_CHARGE_DATE_FORMAT.NOON_UTC_TIME}`
    )
  );
