import { TICKET_DATE } from "../numbers/TicketDate.constants";
import { TIME } from "../strings/Date.constants";

export const CALENDAR_DATE = {
  DAYS_IN_WEEK: 7,
  FIRST_DAY: 1,
  FIRST_MONTH: 1,
  MILLISECONDS_IN_DAY:
    TICKET_DATE.HOURS_IN_A_DAY *
    TIME.UNITS.MINUTES_IN_HOUR *
    TIME.UNITS.SECONDS_IN_MINUTE *
    TIME.UNITS.MILLISECONDS_IN_SECOND,
  MONTHS_IN_YEAR: 12,
  UTC_MONDAY: 1,
} as const;

export const CALENDAR_DATE_ERROR = {
  INVALID_DATE: "Invalid calendar civil date",
  INVALID_INSTANT: "Invalid calendar server instant",
} as const;
