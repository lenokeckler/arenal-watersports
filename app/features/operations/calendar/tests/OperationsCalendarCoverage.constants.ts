import { RESERVATIONS_CALENDAR_COPY as copy } from "@/app/constants";
import {
  OPERATIONS_CALENDAR_EMPTY,
  OPERATIONS_CALENDAR_INCOMPLETE,
  OPERATIONS_CALENDAR_PARTIAL,
  OPERATIONS_CALENDAR_TEST as fixture,
} from "./OperationsCalendar.constants";

export const OPERATIONS_CALENDAR_COVERAGE_CASES = [
  {
    name: "missing",
    snapshot: undefined,
    message: copy.MISSING_SNAPSHOT,
    dayCount: fixture.DAY_COUNT,
    weekCount: fixture.WEEK_COUNT,
  },
  {
    name: "partial",
    snapshot: OPERATIONS_CALENDAR_PARTIAL,
    message: copy.PARTIAL_COVERAGE,
    dayCount: 0,
    weekCount: fixture.WEEK_COUNT - fixture.DAY_COUNT,
  },
  {
    name: "incomplete",
    snapshot: OPERATIONS_CALENDAR_INCOMPLETE,
    message: copy.INCOMPLETE_RESULTS,
    dayCount: fixture.DAY_COUNT,
    weekCount: fixture.WEEK_COUNT,
  },
  {
    name: "complete empty",
    snapshot: OPERATIONS_CALENDAR_EMPTY,
    message: copy.EMPTY_PERIOD,
    dayCount: fixture.DAY_COUNT,
    weekCount: fixture.WEEK_COUNT,
  },
];
