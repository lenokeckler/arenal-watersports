import { describe, expect, it } from "vitest";
import { CALENDAR_VIEW } from "@/app/constants";
import type { CalendarPeriod } from "@/app/components/calendar/models";
import {
  addCalendarDays,
  buildCalendarDays,
} from "@/app/components/calendar/utils/calendarDateArithmetic";
import { buildReservationCalendarContent } from "@/app/components/reservation-calendar/utils/buildReservationCalendarContent";
import {
  COVERAGE_DAY,
  COVERAGE_NEXT_DAY,
  COVERAGE_SNAPSHOT,
} from "./ReservationCalendarCoverage.constants";
import { CALENDAR_BLOCK_ENTRY } from "./ReservationCalendarDisplay.constants";

const createPeriod = (
  start: typeof COVERAGE_DAY,
  end: typeof COVERAGE_DAY,
  view: CalendarPeriod["view"] = CALENDAR_VIEW.DAY
): CalendarPeriod => ({
  days:
    view === CALENDAR_VIEW.YEAR
      ? []
      : buildCalendarDays(start, end),
  end,
  months: [],
  start,
  view,
});

describe("reservation calendar content completeness", (): void => {
  it("returns distinct missing snapshot completeness values", (): void => {
    const content = buildReservationCalendarContent(
      undefined,
      createPeriod(COVERAGE_DAY, COVERAGE_DAY)
    );
    expect(content).toEqual({
      coversPeriod: false,
      groups: [],
      hasAllResults: false,
      hasSnapshot: false,
      loadedCount: 0,
      totalCount: null,
    });
  });

  it("reports partial time coverage independently from a complete result page", (): void => {
    const content = buildReservationCalendarContent(
      COVERAGE_SNAPSHOT,
      createPeriod(COVERAGE_DAY, COVERAGE_NEXT_DAY)
    );
    expect(content.coversPeriod).toBe(false);
    expect(content.hasAllResults).toBe(true);
    expect(content.groups).toHaveLength(1);
  });

  it("does not claim completeness for an empty page with matching records", (): void => {
    const content = buildReservationCalendarContent(
      { ...COVERAGE_SNAPSHOT, entries: [], totalCount: 1 },
      createPeriod(COVERAGE_DAY, COVERAGE_DAY)
    );
    expect(content.groups).toEqual([]);
    expect(content.coversPeriod).toBe(true);
    expect(content.hasAllResults).toBe(false);
    expect(content.loadedCount).toBe(0);
    expect(content.totalCount).toBe(1);
  });

  it("proves an unoccupied selected day from complete snapshot coverage", (): void => {
    const entry = {
      ...CALENDAR_BLOCK_ENTRY,
      dispatches: [CALENDAR_BLOCK_ENTRY.dispatches[0]],
    };
    const snapshot = {
      ...COVERAGE_SNAPSHOT,
      endDateExclusive: addCalendarDays(
        COVERAGE_NEXT_DAY,
        1
      ),
      entries: [entry],
    };
    const content = buildReservationCalendarContent(
      snapshot,
      createPeriod(COVERAGE_NEXT_DAY, COVERAGE_NEXT_DAY)
    );
    expect(content.groups).toEqual([]);
    expect(content.coversPeriod).toBe(true);
    expect(content.hasAllResults).toBe(true);
  });
});
