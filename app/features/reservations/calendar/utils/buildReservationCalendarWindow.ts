import type { CalendarDate } from "@/app/types";
import type { CalendarPeriod } from "@/app/components/calendar/models";
import {
  addCalendarDays,
  toCalendarUtcDate,
} from "@/app/components/calendar/utils/calendarDateArithmetic";
import type { ReservationCalendarWindow } from "@/app/services/reservations/models/ReservationCalendarWindow.interface";
import { RESERVATION_CALENDAR_TIME } from "../constants/ReservationCalendarTime.constants";

const formatCivilDate = (date: CalendarDate): string =>
  toCalendarUtcDate(date)
    .toISOString()
    .slice(0, RESERVATION_CALENDAR_TIME.CIVIL_DATE_LENGTH);

const formatCostaRicaMidnight = (
  date: CalendarDate
): string =>
  `${formatCivilDate(date)}${RESERVATION_CALENDAR_TIME.MIDNIGHT}${RESERVATION_CALENDAR_TIME.COSTA_RICA_UTC_OFFSET}`;

export const buildReservationCalendarWindow = (
  period: CalendarPeriod,
  page: number
): ReservationCalendarWindow => ({
  endsAt: formatCostaRicaMidnight(
    addCalendarDays(period.end, 1)
  ),
  page,
  startsAt: formatCostaRicaMidnight(period.start),
});
