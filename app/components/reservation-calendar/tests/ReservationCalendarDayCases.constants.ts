import { RESERVATIONS_CALENDAR_COPY as copy } from "@/app/constants";
import type { ReservationCalendarDayCase } from "./models/ReservationCalendarDayCase.interface";
import {
  CALENDAR_DAY_EMPTY,
  CALENDAR_DAY_INCOMPLETE,
  CALENDAR_DAY_PARTIAL,
} from "./ReservationCalendarDay.constants";

export const CALENDAR_DAY_COVERAGE_CASES: ReservationCalendarDayCase[] =
  [
    {
      message: copy.MISSING_SNAPSHOT,
      name: "missing snapshot",
      snapshot: undefined,
    },
    {
      message: copy.PARTIAL_COVERAGE,
      name: "uncovered day",
      snapshot: CALENDAR_DAY_PARTIAL,
    },
    {
      message: copy.INCOMPLETE_RESULTS,
      name: "incomplete result page",
      snapshot: CALENDAR_DAY_INCOMPLETE,
    },
    {
      message: copy.EMPTY_PERIOD,
      name: "proven complete empty day",
      snapshot: CALENDAR_DAY_EMPTY,
    },
  ];
