import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import { mapReservationCalendarEntry } from "../utils/mapReservationCalendarEntry";
import { CALENDAR_RESERVATION } from "./ReservationCalendar.constants";

const OCTOBER_ENTRY = mapReservationCalendarEntry(
  CALENDAR_RESERVATION
);

const BUSY_DAY_ENTRIES = [
  {
    ...OCTOBER_ENTRY,
    customerName: "Busy day reservation one",
    endsAt: "2026-10-14T12:00:00Z",
    id: "reservation-busy-day-one",
    startsAt: "2026-10-14T11:00:00Z",
  },
  {
    ...OCTOBER_ENTRY,
    customerName: "Busy day reservation two",
    endsAt: "2026-10-14T14:00:00Z",
    id: "reservation-busy-day-two",
    startsAt: "2026-10-14T13:00:00Z",
  },
  {
    ...OCTOBER_ENTRY,
    customerName: "Busy day reservation three",
    endsAt: "2026-10-14T19:00:00Z",
    id: "reservation-busy-day-three",
    startsAt: "2026-10-14T18:00:00Z",
  },
  {
    ...OCTOBER_ENTRY,
    customerName: "Busy day reservation four",
    endsAt: "2026-10-14T21:00:00Z",
    id: "reservation-busy-day-four",
    startsAt: "2026-10-14T20:00:00Z",
  },
  {
    ...OCTOBER_ENTRY,
    customerName: "Busy day reservation five",
    endsAt: "2026-10-14T23:00:00Z",
    id: "reservation-busy-day-five",
    startsAt: "2026-10-14T22:00:00Z",
  },
];

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

const PADDED_NOVEMBER_ENTRY = {
  ...OCTOBER_ENTRY,
  customerName: "Padded November reservation customer",
  endsAt: "2026-11-01T17:00:00Z",
  id: "reservation-padded-november",
  startsAt: "2026-11-01T16:00:00Z",
};

export const RESERVATIONS_CALENDAR_BUSY_DAY = {
  SNAPSHOT: {
    endDateExclusive: { day: 1, month: 12, year: 2026 },
    entries: [
      OCTOBER_ENTRY,
      ...BUSY_DAY_ENTRIES,
      OCTOBER_SECOND_ENTRY,
      OCTOBER_THIRD_ENTRY,
      NOVEMBER_ENTRY,
      PADDED_NOVEMBER_ENTRY,
    ],
    startDate: { day: 1, month: 1, year: 2026 },
    totalCount: 10,
  } satisfies ReservationCalendarSnapshot,
  EXPECTED_COUNTS: {
    DAY: 6,
    MONTH: 8,
    SELECTED_DAY_AND_MONTH: 14,
    SELECTED_MONTH_AND_YEAR: 18,
    WEEK: 8,
    YEAR: 10,
  },
} as const;
