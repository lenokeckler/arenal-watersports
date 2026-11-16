import { RESERVATION_REFUND_DATE_FORMAT } from "../constants/ReservationRefundUi.constants";

const dateFormat = new Intl.DateTimeFormat(
  RESERVATION_REFUND_DATE_FORMAT.LOCALE,
  RESERVATION_REFUND_DATE_FORMAT.OPTIONS
);

export const formatReservationRefundDate = (
  date: string
): string =>
  dateFormat.format(
    new Date(
      `${date}${RESERVATION_REFUND_DATE_FORMAT.NOON_UTC_TIME}`
    )
  );
