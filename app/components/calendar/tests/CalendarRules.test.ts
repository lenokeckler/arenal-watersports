import { describe, expect, it } from "vitest";
import {
  CALENDAR_DATE_ERROR,
  CALENDAR_NAVIGATION,
  CALENDAR_VIEW,
  CALENDAR_WORK_AREA,
} from "@/app/constants";
import {
  getAllowedCalendarViews,
  getCalendarToday,
  navigateCalendarPeriod,
  buildCalendarPeriod,
} from "../utils";
import {
  toCalendarDate,
  toCalendarUtcDate,
} from "../utils/calendarDateArithmetic";
import { CALENDAR_FIXTURE as fixture } from "./Calendar.constants";

describe("calendar civil dates", () => {
  it("roundtrips years below 100 through UTC without century coercion", () => {
    const instant = toCalendarUtcDate(fixture.earlyYear);

    expect(instant.toISOString()).toBe(
      fixture.earlyYearIso
    );
    expect(toCalendarDate(instant)).toEqual(
      fixture.earlyYear
    );
  });

  it.each(fixture.invalidDates)(
    "rejects invalid civil date %j at conversion and public boundaries",
    (date) => {
      expect(() => toCalendarUtcDate(date)).toThrow(
        CALENDAR_DATE_ERROR.INVALID_DATE
      );
      expect(() =>
        buildCalendarPeriod(date, CALENDAR_VIEW.DAY)
      ).toThrow(CALENDAR_DATE_ERROR.INVALID_DATE);
      expect(() =>
        navigateCalendarPeriod(
          date,
          CALENDAR_VIEW.MONTH,
          CALENDAR_NAVIGATION.NEXT
        )
      ).toThrow(CALENDAR_DATE_ERROR.INVALID_DATE);
    }
  );

  it("rejects an invalid UTC instant", () => {
    const invalid = new Date(fixture.invalidInstant);

    expect(() => toCalendarDate(invalid)).toThrow(
      CALENDAR_DATE_ERROR.INVALID_DATE
    );
  });
});

describe("getCalendarToday", () => {
  it.each([
    [fixture.beforeMidnight, fixture.leapEnd],
    [fixture.midnight, fixture.marchStart],
  ])(
    "uses Costa Rica midnight for supplied instant %s",
    (instant, expected) => {
      const result = getCalendarToday(new Date(instant));

      expect(result).toEqual(expected);
    }
  );

  it("rejects an invalid server instant", () => {
    const invalid = new Date(fixture.invalidInstant);

    expect(() => getCalendarToday(invalid)).toThrow(
      CALENDAR_DATE_ERROR.INVALID_INSTANT
    );
  });
});

describe("getAllowedCalendarViews", () => {
  it("limits operations to day and week", () => {
    const result = getAllowedCalendarViews(
      CALENDAR_WORK_AREA.OPERATIONS
    );

    expect(result).toEqual([
      CALENDAR_VIEW.DAY,
      CALENDAR_VIEW.WEEK,
    ]);
  });

  it("allows all four views in reservations", () => {
    const result = getAllowedCalendarViews(
      CALENDAR_WORK_AREA.RESERVATIONS
    );

    expect(result).toEqual([
      CALENDAR_VIEW.DAY,
      CALENDAR_VIEW.WEEK,
      CALENDAR_VIEW.MONTH,
      CALENDAR_VIEW.YEAR,
    ]);
  });

  it("denies views to administration without a verified calendar area", () => {
    const result = getAllowedCalendarViews(
      fixture.deniedArea
    );

    expect(result).toEqual([]);
  });
});
