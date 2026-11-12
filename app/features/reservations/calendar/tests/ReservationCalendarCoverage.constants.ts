import type { CalendarDate } from "@/app/types";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import { CALENDAR_BLOCK_ENTRY } from "./ReservationCalendarDisplay.constants";

export const COVERAGE_DAY: CalendarDate = {
  year: 2026,
  month: 10,
  day: 14,
};
export const COVERAGE_NEXT_DAY: CalendarDate = {
  ...COVERAGE_DAY,
  day: 15,
};

export const COVERAGE_SNAPSHOT: ReservationCalendarSnapshot =
  {
    endDateExclusive: COVERAGE_NEXT_DAY,
    entries: [CALENDAR_BLOCK_ENTRY],
    startDate: COVERAGE_DAY,
    totalCount: 1,
  };

export const COVERAGE_INSTANT = {
  BEFORE_DAY: "2026-10-14T05:59:59.999Z",
  DAY_END: "2026-10-15T06:00:00Z",
  DAY_START: "2026-10-14T06:00:00Z",
  NEXT_DAY_END: "2026-10-16T06:00:00Z",
  NEXT_DAY_INSIDE: "2026-10-15T18:00:00Z",
} as const;

export const INVALID_COVERAGE_DATES: CalendarDate[] = [
  { ...COVERAGE_DAY, month: 2, day: 30 },
  { ...COVERAGE_DAY, day: Number.NaN },
  { ...COVERAGE_DAY, year: Number.POSITIVE_INFINITY },
];

export const INVALID_COVERAGE_COUNTS = [
  -1,
  0,
  0.5,
  Number.NaN,
  Number.POSITIVE_INFINITY,
  Number.MAX_SAFE_INTEGER + 1,
] as const;

export const SCHEDULED_DAY_CASES = [
  [
    COVERAGE_INSTANT.DAY_START,
    COVERAGE_INSTANT.DAY_END,
    true,
  ],
  [
    COVERAGE_INSTANT.BEFORE_DAY,
    COVERAGE_INSTANT.DAY_START,
    false,
  ],
  [
    COVERAGE_INSTANT.DAY_END,
    COVERAGE_INSTANT.NEXT_DAY_END,
    false,
  ],
  [
    COVERAGE_INSTANT.BEFORE_DAY,
    COVERAGE_INSTANT.NEXT_DAY_END,
    true,
  ],
  ["2026-10-14T05:00:00Z", "2026-10-14T05:30:00Z", false],
  [
    "2026-10-14T00:00:00-06:00",
    "2026-10-14T01:00:00-06:00",
    true,
  ],
] as const;

export const ACTUAL_DAY_CASES = [
  [
    COVERAGE_INSTANT.DAY_START,
    COVERAGE_INSTANT.DAY_END,
    COVERAGE_INSTANT.NEXT_DAY_END,
    false,
  ],
  [
    COVERAGE_INSTANT.DAY_START,
    COVERAGE_INSTANT.NEXT_DAY_INSIDE,
    COVERAGE_INSTANT.DAY_END,
    true,
  ],
  [
    COVERAGE_INSTANT.DAY_START,
    null,
    COVERAGE_INSTANT.DAY_END,
    true,
  ],
  [COVERAGE_INSTANT.DAY_START, null, null, true],
  [
    COVERAGE_INSTANT.DAY_END,
    COVERAGE_INSTANT.DAY_END,
    null,
    true,
  ],
  [
    COVERAGE_INSTANT.NEXT_DAY_INSIDE,
    COVERAGE_INSTANT.NEXT_DAY_INSIDE,
    null,
    true,
  ],
  [
    COVERAGE_INSTANT.NEXT_DAY_END,
    COVERAGE_INSTANT.NEXT_DAY_END,
    null,
    false,
  ],
  [COVERAGE_INSTANT.NEXT_DAY_END, null, null, false],
] as const;
