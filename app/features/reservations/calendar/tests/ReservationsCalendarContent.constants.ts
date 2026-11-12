import type { CalendarDate } from "@/app/types";
import type { CalendarView } from "@/app/types";
import { CALENDAR_VIEW } from "@/app/constants";
import { CALENDAR_DAY_CLASS } from "@/app/components/calendar/styles/Calendar.styles";
import { RESERVATION_CALENDAR_GROUP_BLOCKS_CLASS } from "../styles/ReservationCalendarGroups.styles";
import { mapReservationCalendarEntry } from "../utils/mapReservationCalendarEntry";
import { CALENDAR_RESERVATION } from "./ReservationCalendar.constants";

export const RESERVATIONS_CALENDAR_CONTENT_FIXTURE = {
  date: {
    year: 2026,
    month: 10,
    day: 14,
  } satisfies CalendarDate,
  snapshot: {
    endDateExclusive: { year: 2026, month: 11, day: 1 },
    entries: [
      mapReservationCalendarEntry(CALENDAR_RESERVATION),
    ],
    startDate: { year: 2026, month: 10, day: 1 },
    totalCount: 1,
  },
  emptySnapshot: {
    endDateExclusive: { year: 2026, month: 10, day: 15 },
    entries: [],
    startDate: { year: 2026, month: 10, day: 14 },
    totalCount: 0,
  },
  incompleteSnapshot: {
    endDateExclusive: { year: 2026, month: 10, day: 15 },
    entries: [
      mapReservationCalendarEntry(CALENDAR_RESERVATION),
    ],
    startDate: { year: 2026, month: 10, day: 14 },
    totalCount: 2,
  },
  partialCoverageSnapshot: {
    endDateExclusive: { year: 2026, month: 10, day: 14 },
    entries: [],
    startDate: { year: 2026, month: 10, day: 13 },
    totalCount: 0,
  },
} as const;

export const RESERVATION_BLOCK_CONTAINER_CLASS: Record<
  CalendarView,
  string
> = {
  [CALENDAR_VIEW.DAY]: CALENDAR_DAY_CLASS,
  [CALENDAR_VIEW.WEEK]: CALENDAR_DAY_CLASS,
  [CALENDAR_VIEW.MONTH]:
    RESERVATION_CALENDAR_GROUP_BLOCKS_CLASS,
  [CALENDAR_VIEW.YEAR]:
    RESERVATION_CALENDAR_GROUP_BLOCKS_CLASS,
};
