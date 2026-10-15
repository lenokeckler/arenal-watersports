import {
  CALENDAR_PRESENTATION,
  STRING,
} from "@/app/constants";
import { RESERVATION_CALENDAR_TIME } from "../constants/ReservationCalendarProjection.constants";
import { formatReservationCalendarTime } from "./formatReservationCalendarTime";
import { parseReservationCalendarInstant } from "./parseReservationCalendarInstant";

export const formatReservationCalendarDateTime = (
  instant: string
): string =>
  [
    new Intl.DateTimeFormat(
      RESERVATION_CALENDAR_TIME.LOCALE,
      {
        ...CALENDAR_PRESENTATION.DATE_OPTIONS,
        timeZone:
          RESERVATION_CALENDAR_TIME.OPTIONS.timeZone,
      }
    ).format(parseReservationCalendarInstant(instant)),
    formatReservationCalendarTime(instant),
  ].join(STRING.COMMA_SPACE);
