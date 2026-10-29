import { describe, expect, it } from "vitest";
import { CALENDAR_VIEW } from "@/app/constants";
import type { CalendarPeriod } from "@/app/components/calendar/models";
import {
  addCalendarDays,
  buildCalendarDays,
} from "@/app/components/calendar/utils/calendarDateArithmetic";
import { buildReservationCalendarContent } from "../utils/buildReservationCalendarContent";
import {
  COVERAGE_DAY,
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

describe("reservation calendar grouping", (): void => {
  it("groups each matching reservation once per covered civil day", (): void => {
    const content = buildReservationCalendarContent(
      COVERAGE_SNAPSHOT,
      createPeriod(COVERAGE_DAY, COVERAGE_DAY)
    );
    expect(content.groups).toHaveLength(1);
    expect(content.groups[0].blocks).toHaveLength(1);
    expect(content.groups[0].blocks[0].id).toBe(
      CALENDAR_BLOCK_ENTRY.id
    );
  });

  it("uses the bounded year period when its supplied days are empty", (): void => {
    const yearStart = { ...COVERAGE_DAY, month: 1, day: 1 };
    const yearEnd = { ...COVERAGE_DAY, month: 12, day: 31 };
    const yearPeriod = createPeriod(
      yearStart,
      yearEnd,
      CALENDAR_VIEW.YEAR
    );
    const snapshot = {
      ...COVERAGE_SNAPSHOT,
      endDateExclusive: addCalendarDays(yearEnd, 1),
      entries: [
        {
          ...CALENDAR_BLOCK_ENTRY,
          dispatches: [CALENDAR_BLOCK_ENTRY.dispatches[1]],
        },
      ],
      startDate: yearStart,
    };
    const content = buildReservationCalendarContent(
      snapshot,
      yearPeriod
    );
    expect(yearPeriod.days).toEqual([]);
    expect(content.groups.at(-1)?.date).toEqual(yearEnd);
    expect(content.groups[0].blocks[0]).toBe(
      content.groups.at(-1)?.blocks[0]
    );
    expect(content.coversPeriod).toBe(true);
  });

  it("sorts by scheduled start and id without mutating entries", (): void => {
    const laterEntry = {
      ...CALENDAR_BLOCK_ENTRY,
      id: "later",
      startsAt: "2026-10-14T18:00:00Z",
    };
    const firstEntry = {
      ...CALENDAR_BLOCK_ENTRY,
      id: "zulu",
      startsAt: "2026-10-14T12:00:00Z",
    };
    const tiedEntry = {
      ...CALENDAR_BLOCK_ENTRY,
      id: "alpha",
      startsAt: firstEntry.startsAt,
    };
    const entries = [laterEntry, firstEntry, tiedEntry];
    const snapshot = {
      ...COVERAGE_SNAPSHOT,
      entries,
      totalCount: entries.length,
    };
    const originalEntries = [...entries];
    const content = buildReservationCalendarContent(
      snapshot,
      createPeriod(COVERAGE_DAY, COVERAGE_DAY)
    );
    expect(
      content.groups[0].blocks.map(({ id }) => id)
    ).toEqual(["alpha", "zulu", "later"]);
    expect(entries).toEqual(originalEntries);
  });

  it("adds one block when several actual groups match the same day", (): void => {
    const entry = {
      ...CALENDAR_BLOCK_ENTRY,
      dispatches: [
        ...CALENDAR_BLOCK_ENTRY.dispatches,
        {
          ...CALENDAR_BLOCK_ENTRY.dispatches[1],
          id: "second-open-group",
        },
      ],
    };
    const content = buildReservationCalendarContent(
      { ...COVERAGE_SNAPSHOT, entries: [entry] },
      createPeriod(COVERAGE_DAY, COVERAGE_DAY)
    );
    expect(content.groups[0].blocks).toHaveLength(1);
    expect(
      content.groups[0].blocks[0].actualLabels
    ).toHaveLength(3);
  });
});
