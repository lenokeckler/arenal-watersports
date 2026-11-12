import { describe, expect, it } from "vitest";
import {
  CALENDAR_NAVIGATION,
  CALENDAR_VIEW,
} from "@/app/constants";
import { navigateCalendarPeriod } from "../utils";
import { CALENDAR_FIXTURE as fixture } from "./Calendar.constants";

describe("navigateCalendarPeriod", () => {
  it.each([
    [
      fixture.yearEnd,
      CALENDAR_VIEW.DAY,
      CALENDAR_NAVIGATION.NEXT,
      fixture.yearStart,
    ],
    [
      fixture.yearStart,
      CALENDAR_VIEW.DAY,
      CALENDAR_NAVIGATION.PREVIOUS,
      fixture.yearEnd,
    ],
    [
      fixture.leapEnd,
      CALENDAR_VIEW.DAY,
      CALENDAR_NAVIGATION.NEXT,
      fixture.marchStart,
    ],
    [
      fixture.marchStart,
      CALENDAR_VIEW.DAY,
      CALENDAR_NAVIGATION.PREVIOUS,
      fixture.leapEnd,
    ],
    [
      fixture.yearEnd,
      CALENDAR_VIEW.WEEK,
      CALENDAR_NAVIGATION.NEXT,
      fixture.januaryWeekLater,
    ],
    [
      fixture.yearStart,
      CALENDAR_VIEW.WEEK,
      CALENDAR_NAVIGATION.PREVIOUS,
      fixture.decemberWeekEarlier,
    ],
    [
      fixture.januaryEnd,
      CALENDAR_VIEW.MONTH,
      CALENDAR_NAVIGATION.NEXT,
      fixture.leapStart,
    ],
    [
      fixture.marchEnd,
      CALENDAR_VIEW.MONTH,
      CALENDAR_NAVIGATION.PREVIOUS,
      fixture.leapStart,
    ],
    [
      fixture.sameYearEnd,
      CALENDAR_VIEW.MONTH,
      CALENDAR_NAVIGATION.NEXT,
      fixture.nextYearStart,
    ],
    [
      fixture.yearStart,
      CALENDAR_VIEW.MONTH,
      CALENDAR_NAVIGATION.PREVIOUS,
      fixture.decemberStart,
    ],
    [
      fixture.leapEnd,
      CALENDAR_VIEW.YEAR,
      CALENDAR_NAVIGATION.NEXT,
      fixture.nextYearStart,
    ],
    [
      fixture.leapEnd,
      CALENDAR_VIEW.YEAR,
      CALENDAR_NAVIGATION.PREVIOUS,
      fixture.previousYearStart,
    ],
  ])(
    "moves %j by one %s period in direction %s",
    (date, view, direction, expected) => {
      const original = { ...date };

      const result = navigateCalendarPeriod(
        date,
        view,
        direction
      );

      expect(result).toEqual(expected);
      expect(date).toEqual(original);
    }
  );
});
