import { UNIT_RESERVATION_DATE_FORMAT } from "../constants/UnitReservationDateFormat.constants";

export const formatUnitReservationStart = (
  startsAt: string
): string =>
  new Intl.DateTimeFormat(
    UNIT_RESERVATION_DATE_FORMAT.LOCALE,
    UNIT_RESERVATION_DATE_FORMAT.OPTIONS
  ).format(new Date(startsAt));
