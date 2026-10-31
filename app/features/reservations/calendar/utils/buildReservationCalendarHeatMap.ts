import { CALENDAR_HEAT_LEVEL } from "@/app/components/calendar/constants/CalendarHeatLevel.constants";
import type { CalendarHeatLevel } from "@/app/components/calendar/constants/CalendarHeatLevel.constants";
import type { CalendarDate } from "@/app/types";
import type { NullableUndefined } from "@/app/types";
import {
  addCalendarDays,
  toCalendarUtcDate,
} from "@/app/components/calendar/utils/calendarDateArithmetic";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import type { ReservationCalendarHeatMap } from "../models/ReservationCalendarHeatMap.interface";
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

const getDailyReservationCount = (
  snapshot: ReservationCalendarSnapshot,
  date: CalendarDate
): NullableUndefined<number> => {
  if (
    !hasCompleteResults(snapshot) ||
    !coversDate(snapshot, date)
  ) {
    return undefined;
  }
  return new Set(
    snapshot.entries
      .filter((entry) =>
        reservationIntersectsCalendarDay(entry, date)
      )
      .map((entry) => entry.id)
  ).size;
};

export const buildReservationCalendarHeatMap = (
  snapshot: ReservationCalendarSnapshot
): ReservationCalendarHeatMap => {
  validateReservationCalendarSnapshot(snapshot);
  const getDayReservationCount = (
    date: CalendarDate
  ): NullableUndefined<number> =>
    getDailyReservationCount(snapshot, date);
  return {
    getDayReservationCount,
    getDayHeatLevel: (
      date: CalendarDate
    ): CalendarHeatLevel => {
      const reservationCount = getDayReservationCount(date);
      return reservationCount === undefined
        ? CALENDAR_HEAT_LEVEL.NONE
        : getReservationCalendarHeatLevel(reservationCount);
    },
  };
};
