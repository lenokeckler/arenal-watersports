import type { CalendarDate } from "@/app/types";
import type { ReservationCalendarEntry } from "../models/ReservationCalendarEntry.interface";
import type { ReservationCalendarSnapshot } from "../models/ReservationCalendarSnapshot.interface";

export const CALENDAR_DAY_DATE: CalendarDate = {
  day: 15,
  month: 10,
  year: 2026,
};

export const CALENDAR_DAY_ENTRY: ReservationCalendarEntry =
  {
    customerName: "Shared calendar customer",
    dispatches: [],
    endsAt: "2026-10-15T18:00:00Z",
    equipment: [],
    id: "shared-calendar-reservation",
    startsAt: "2026-10-15T16:00:00Z",
    status: "scheduled",
  };

export const CALENDAR_DAY_SNAPSHOT: ReservationCalendarSnapshot =
  {
    endDateExclusive: { ...CALENDAR_DAY_DATE, day: 16 },
    entries: [CALENDAR_DAY_ENTRY],
    startDate: CALENDAR_DAY_DATE,
    totalCount: 1,
  };

export const CALENDAR_DAY_EMPTY: ReservationCalendarSnapshot =
  {
    ...CALENDAR_DAY_SNAPSHOT,
    entries: [],
    totalCount: 0,
  };

export const CALENDAR_DAY_PARTIAL: ReservationCalendarSnapshot =
  {
    ...CALENDAR_DAY_EMPTY,
    endDateExclusive: CALENDAR_DAY_DATE,
    startDate: { ...CALENDAR_DAY_DATE, day: 14 },
  };

export const CALENDAR_DAY_INCOMPLETE: ReservationCalendarSnapshot =
  {
    ...CALENDAR_DAY_SNAPSHOT,
    totalCount: 2,
  };
