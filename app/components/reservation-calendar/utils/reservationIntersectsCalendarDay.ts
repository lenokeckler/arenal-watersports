import { CALENDAR_DATE, TIME } from "@/app/constants";
import { toCalendarUtcDate } from "@/app/components/calendar/utils/calendarDateArithmetic";
import type { CalendarDate } from "@/app/types";
import { RESERVATION_CALENDAR_EXCLUDED_STATUS as excluded } from "../constants/ReservationCalendarExcludedStatus.constants";
import type { ReservationCalendarDispatch } from "../models/ReservationCalendarDispatch.interface";
import type { ReservationCalendarEntry } from "../models/ReservationCalendarEntry.interface";
import { parseReservationCalendarInstant } from "./parseReservationCalendarInstant";

const dispatchIntersects = (
  dispatch: ReservationCalendarDispatch,
  dayStart: number,
  dayEnd: number
): boolean => {
  const departure = parseReservationCalendarInstant(
    dispatch.startsAt
  );
  if (departure >= dayEnd) {
    return false;
  }
  if (dispatch.closedAt === null) {
    return true;
  }
  const closure = parseReservationCalendarInstant(
    dispatch.closedAt
  );
  return (
    closure > dayStart ||
    (closure === departure && departure === dayStart)
  );
};

export const reservationIntersectsCalendarDay = (
  entry: ReservationCalendarEntry,
  date: CalendarDate
): boolean => {
  if (
    entry.status === excluded.CANCELLED ||
    entry.status === excluded.CLOSED
  ) {
    return false;
  }
  const dayStart =
    toCalendarUtcDate(date).getTime() +
    TIME.CR.HOURS_OFFSET *
      TIME.UNITS.MINUTES_IN_HOUR *
      TIME.UNITS.SECONDS_IN_MINUTE *
      TIME.UNITS.MILLISECONDS_IN_SECOND;
  const dayEnd =
    dayStart + CALENDAR_DATE.MILLISECONDS_IN_DAY;
  const scheduledStart = parseReservationCalendarInstant(
    entry.startsAt
  );
  const scheduledEnd = parseReservationCalendarInstant(
    entry.endsAt
  );
  return (
    (scheduledStart < dayEnd && scheduledEnd > dayStart) ||
    entry.dispatches.some((dispatch): boolean =>
      dispatchIntersects(dispatch, dayStart, dayEnd)
    )
  );
};
