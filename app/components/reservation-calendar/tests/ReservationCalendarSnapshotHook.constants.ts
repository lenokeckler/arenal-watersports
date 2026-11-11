import type { CalendarPeriod } from "@/app/components/calendar/models/CalendarPeriod.interface";
import { addCalendarDays } from "@/app/components/calendar/utils/calendarDateArithmetic";
import { buildCalendarPeriod } from "@/app/components/calendar/utils/buildCalendarPeriod";
import { CALENDAR_VIEW } from "@/app/constants";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";

const CALENDAR_ANCHOR = {
  day: 14,
  month: 10,
  year: 2026,
};

const buildEmptySnapshot = (
  period: CalendarPeriod
): ReservationCalendarSnapshot => ({
  endDateExclusive: addCalendarDays(period.end, 1),
  entries: [],
  startDate: period.start,
  totalCount: 0,
});

export const RESERVATION_CALENDAR_SNAPSHOT_HOOK_FIXTURE = {
  RETRY_ATTEMPTS: 2,
  DAY_PERIOD: buildCalendarPeriod(
    CALENDAR_ANCHOR,
    CALENDAR_VIEW.DAY
  ),
  DAY_SNAPSHOT: buildEmptySnapshot(
    buildCalendarPeriod(CALENDAR_ANCHOR, CALENDAR_VIEW.DAY)
  ),
  WEEK_PERIOD: buildCalendarPeriod(
    CALENDAR_ANCHOR,
    CALENDAR_VIEW.WEEK
  ),
  WEEK_SNAPSHOT: buildEmptySnapshot(
    buildCalendarPeriod(CALENDAR_ANCHOR, CALENDAR_VIEW.WEEK)
  ),
} as const;
