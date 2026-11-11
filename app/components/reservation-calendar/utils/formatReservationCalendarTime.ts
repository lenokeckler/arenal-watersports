import { RESERVATION_CALENDAR_TIME } from "../constants/ReservationCalendarProjection.constants";
import { parseReservationCalendarInstant } from "./parseReservationCalendarInstant";

export const formatReservationCalendarTime = (
  instant: string
): string =>
  new Intl.DateTimeFormat(
    RESERVATION_CALENDAR_TIME.LOCALE,
    RESERVATION_CALENDAR_TIME.OPTIONS
  ).format(parseReservationCalendarInstant(instant));
