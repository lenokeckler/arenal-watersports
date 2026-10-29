import { describe, expect, it } from "vitest";
import {
  CALENDAR_DATE,
  CALENDAR_VIEW,
} from "@/app/constants";
import { buildCalendarPeriod } from "../utils";
import { toCalendarUtcDate } from "../utils/calendarDateArithmetic";
import { CALENDAR_FIXTURE as fixture } from "./Calendar.constants";
import type { MonthCalendarCase } from "./models/MonthCalendarCase.interface";

describe("buildCalendarPeriod", () => {
  it("returns exactly the selected civil day", () => {
    const result = buildCalendarPeriod(
      fixture.yearEnd,
      CALENDAR_VIEW.DAY
    );

    expect(result).toEqual({
      view: CALENDAR_VIEW.DAY,
      start: fixture.yearEnd,
      end: fixture.yearEnd,
      days: [fixture.yearEnd],
      months: [],
    });
  });

  it.each([
    [fixture.yearEnd, fixture.weekStart, fixture.yearEnd],
    [fixture.yearStart, fixture.yearStart, fixture.weekEnd],
    [fixture.weekEnd, fixture.yearStart, fixture.weekEnd],
    [
      fixture.sameYearEnd,
      fixture.crossYearWeekStart,
      fixture.crossYearWeekEnd,
    ],
  ])(
    "returns a Monday-first complete week for %j",
    (date, start, end) => {
      const result = buildCalendarPeriod(
        date,
        CALENDAR_VIEW.WEEK
      );

      expect(result.start).toEqual(start);
      expect(result.end).toEqual(end);
      expect(result.days).toHaveLength(
        CALENDAR_DATE.DAYS_IN_WEEK
      );
      expect(result.days.at(fixture.firstIndex)).toEqual(
        start
      );
      expect(result.days.at(fixture.lastIndex)).toEqual(
        end
      );
      expect(
        result.days.map((day) =>
          toCalendarUtcDate(day).getUTCDay()
        )
      ).toEqual(fixture.weekdays);
    }
  );

  it.each([
    {
      start: fixture.leapStart,
      end: fixture.leapEnd,
      gridStart: fixture.leapGridStart,
      gridEnd: fixture.leapGridEnd,
      length: fixture.februaryGridLength,
    },
    {
      start: fixture.nonLeapStart,
      end: fixture.nonLeapEnd,
      gridStart: fixture.nonLeapGridStart,
      gridEnd: fixture.nonLeapGridEnd,
      length: fixture.februaryGridLength,
    },
    {
      start: fixture.septemberStart,
      end: fixture.septemberEnd,
      gridStart: fixture.septemberGridStart,
      gridEnd: fixture.septemberGridEnd,
      length: fixture.septemberGridLength,
    },
  ] satisfies MonthCalendarCase[])(
    "keeps month boundaries separate from padded weeks for $start",
    ({ start, end, gridStart, gridEnd, length }) => {
      const result = buildCalendarPeriod(
        start,
        CALENDAR_VIEW.MONTH
      );

      expect(result.start).toEqual(start);
      expect(result.end).toEqual(end);
      expect(result.days.at(fixture.firstIndex)).toEqual(
        gridStart
      );
      expect(result.days.at(fixture.lastIndex)).toEqual(
        gridEnd
      );
      expect(result.days).toHaveLength(length);
      expect(result.days).toContainEqual(end);
    }
  );

  it("builds twelve ordered grids without expanding year boundaries", () => {
    const result = buildCalendarPeriod(
      fixture.leapEnd,
      CALENDAR_VIEW.YEAR
    );

    expect(result.start).toEqual(fixture.yearStart);
    expect(result.end).toEqual(fixture.sameYearEnd);
    expect(result.days).toEqual([]);
    expect(result.months).toHaveLength(
      CALENDAR_DATE.MONTHS_IN_YEAR
    );
    expect(result.months.map(({ month }) => month)).toEqual(
      Array.from(
        { length: CALENDAR_DATE.MONTHS_IN_YEAR },
        (_, index) => index + CALENDAR_DATE.FIRST_MONTH
      )
    );
    expect(
      result.months.every(
        ({ year, days }) =>
          year === fixture.yearStart.year &&
          days.length % CALENDAR_DATE.DAYS_IN_WEEK ===
            fixture.firstIndex
      )
    ).toBe(true);
  });
});
