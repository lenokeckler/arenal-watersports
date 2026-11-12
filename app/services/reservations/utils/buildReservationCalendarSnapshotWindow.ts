import type { CalendarDate } from "@/app/types";
import type { CalendarPeriod } from "@/app/components/calendar/models/CalendarPeriod.interface";
import {
  addCalendarDays,
  toCalendarUtcDate,
} from "@/app/components/calendar/utils/calendarDateArithmetic";
import type { ReservationCalendarReadWindow } from "../models/ReservationCalendarReadWindow.interface";
import { RESERVATION_CALENDAR_SNAPSHOT_TIME as time } from "../constants/ReservationCalendarSnapshot.constants";

const formatCivilDate = (date: CalendarDate): string =>
  toCalendarUtcDate(date)
    .toISOString()
    .slice(0, time.CIVIL_DATE_LENGTH);

const formatCostaRicaMidnight = (
  date: CalendarDate
): string =>
  `${formatCivilDate(date)}${time.MIDNIGHT}${time.COSTA_RICA_OFFSET}`;

export const buildReservationCalendarSnapshotWindow = (
  period: CalendarPeriod
): ReservationCalendarReadWindow => ({
  endsAt: formatCostaRicaMidnight(
    addCalendarDays(period.end, 1)
  ),
  startsAt: formatCostaRicaMidnight(period.start),
});
