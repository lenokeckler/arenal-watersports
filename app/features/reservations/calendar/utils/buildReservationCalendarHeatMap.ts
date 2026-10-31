import { CALENDAR_HEAT_LEVEL } from "@/app/components/calendar/constants/CalendarHeatLevel.constants";
import type { CalendarHeatLevel } from "@/app/components/calendar/constants/CalendarHeatLevel.constants";
import type { CalendarDate } from "@/app/types";
import {
  addCalendarDays,
  toCalendarUtcDate,
} from "@/app/components/calendar/utils/calendarDateArithmetic";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import { reservationIntersectsCalendarDay } from "@/app/components/reservation-calendar/utils/reservationIntersectsCalendarDay";
import { getReservationCalendarHeatLevel } from "./getReservationCalendarHeatLevel";
import { validateReservationCalendarSnapshot } from "@/app/components/reservation-calendar/utils/validateReservationCalendarSnapshot";

const compareDates = (
  firstDate: CalendarDate,
  secondDate: CalendarDate
): number =>
  toCalendarUtcDate(firstDate).getTime() -
  toCalendarUtcDate(secondDate).getTime();

const hasCompleteResults = (
  snapshot: ReservationCalendarSnapshot
): boolean =>
  snapshot.entries.length === snapshot.totalCount;

const coversDate = (
  snapshot: ReservationCalendarSnapshot,
  date: CalendarDate
): boolean =>
  compareDates(snapshot.startDate, date) <= 0 &&
  compareDates(
    snapshot.endDateExclusive,
    addCalendarDays(date, 1)
  ) >= 0;

const getDailyHeatLevel = (
  snapshot: ReservationCalendarSnapshot,
  date: CalendarDate
): CalendarHeatLevel => {
  if (
    !hasCompleteResults(snapshot) ||
    !coversDate(snapshot, date)
  ) {
    return CALENDAR_HEAT_LEVEL.NONE;
  }
  const reservationIds = new Set(
    snapshot.entries
      .filter((entry) =>
        reservationIntersectsCalendarDay(entry, date)
      )
      .map((entry) => entry.id)
  );
  return getReservationCalendarHeatLevel(
    reservationIds.size
  );
};

export const buildReservationCalendarHeatMap = (
  snapshot: ReservationCalendarSnapshot
) => {
  validateReservationCalendarSnapshot(snapshot);
  return {
    getDayHeatLevel: (
      date: CalendarDate
    ): CalendarHeatLevel =>
      getDailyHeatLevel(snapshot, date),
  };
};
