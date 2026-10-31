import type { CalendarDate } from "@/app/types";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import { mapReservationCalendarEntry } from "../utils/mapReservationCalendarEntry";
import { CALENDAR_RESERVATION } from "./ReservationCalendar.constants";

const OCTOBER_DATE: CalendarDate = {
  day: 14,
  month: 10,
  year: 2026,
};

const OCTOBER_ENTRY = mapReservationCalendarEntry(
  CALENDAR_RESERVATION
);
const OCTOBER_CUSTOMER_NAME = OCTOBER_ENTRY.customerName;

const OCTOBER_SECOND_ENTRY = {
  ...OCTOBER_ENTRY,
  customerName: "Second October reservation customer",
  endsAt: "2026-10-15T17:00:00Z",
  id: "reservation-october-second",
  startsAt: "2026-10-15T16:00:00Z",
};

const OCTOBER_THIRD_ENTRY = {
  ...OCTOBER_ENTRY,
  customerName: "Third October reservation customer",
  endsAt: "2026-10-16T17:00:00Z",
  id: "reservation-october-third",
  startsAt: "2026-10-16T16:00:00Z",
};

const NOVEMBER_ENTRY = {
  ...OCTOBER_ENTRY,
  customerName: "November reservation customer",
  endsAt: "2026-11-15T17:00:00Z",
  id: "reservation-november",
  startsAt: "2026-11-15T16:00:00Z",
};

const PADDED_NOVEMBER_DATE: CalendarDate = {
  day: 1,
  month: 11,
  year: 2026,
};
const OUTSIDE_COVERAGE_DATE: CalendarDate = {
  day: 16,
  month: 10,
  year: 2026,
};

const PADDED_NOVEMBER_ENTRY = {
  ...OCTOBER_ENTRY,
  customerName: "Padded November reservation customer",
  endsAt: "2026-11-01T17:00:00Z",
  id: "reservation-padded-november",
  startsAt: "2026-11-01T16:00:00Z",
};

export const RESERVATIONS_CALENDAR_SELECTION = {
  OCTOBER_CUSTOMER_NAME,
  PRESSED: "aria-pressed",
  FALSE: "false",
  TRUE: "true",
  OCTOBER_DATE,
  EMPTY_OCTOBER_DATE: {
    day: 13,
    month: 10,
    year: 2026,
  } satisfies CalendarDate,
  PADDED_NOVEMBER_DATE,
  OUTSIDE_COVERAGE_DATE,
  MULTIDAY_LAST_DATE: {
    day: 17,
    month: 10,
    year: 2026,
  } satisfies CalendarDate,
  PADDED_NOVEMBER_CUSTOMER_NAME:
    PADDED_NOVEMBER_ENTRY.customerName,
  OCTOBER_MONTH: {
    day: 1,
    month: 10,
    year: 2026,
  } satisfies CalendarDate,
  SNAPSHOT: {
    endDateExclusive: { day: 1, month: 12, year: 2026 },
    entries: [
      OCTOBER_ENTRY,
      OCTOBER_SECOND_ENTRY,
      OCTOBER_THIRD_ENTRY,
      NOVEMBER_ENTRY,
      PADDED_NOVEMBER_ENTRY,
    ],
    startDate: { day: 1, month: 1, year: 2026 },
    totalCount: 5,
  } satisfies ReservationCalendarSnapshot,
  MULTIDAY_SNAPSHOT: {
    endDateExclusive: { day: 1, month: 12, year: 2026 },
    entries: [
      {
        ...OCTOBER_ENTRY,
        endsAt: "2026-10-18T17:00:00Z",
        id: "reservation-multi-day",
      },
    ],
    startDate: { day: 1, month: 10, year: 2026 },
    totalCount: 1,
  } satisfies ReservationCalendarSnapshot,
  INCOMPLETE_SNAPSHOT: {
    endDateExclusive: { day: 1, month: 12, year: 2026 },
    entries: [OCTOBER_ENTRY],
    startDate: { day: 1, month: 10, year: 2026 },
    totalCount: 2,
  } satisfies ReservationCalendarSnapshot,
  PARTIAL_COVERAGE_SNAPSHOT: {
    endDateExclusive: OUTSIDE_COVERAGE_DATE,
    entries: [],
    startDate: OCTOBER_DATE,
    totalCount: 0,
  } satisfies ReservationCalendarSnapshot,
} as const;
