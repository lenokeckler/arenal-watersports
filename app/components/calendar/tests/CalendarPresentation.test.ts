import { describe, expect, it } from "vitest";
import { CALENDAR_PRESENTATION } from "@/app/constants";
import {
  buildCalendarCells,
  formatCalendarDate,
} from "../utils/formatCalendarPresentation";
import { CALENDAR_FIXTURE as fixture } from "./Calendar.constants";
import { CALENDAR_TEST } from "./CalendarPresentation.constants";

describe("calendar presentation", () => {
  it("formats a civil leap day without a host timezone shift", () => {
    const label = formatCalendarDate(fixture.leapEnd);

    expect(label).toBe(CALENDAR_TEST.LEAP_LABEL);
  });

  it("marks only the matching civil date as current", () => {
    const cells = buildCalendarCells(
      [fixture.leapEnd, fixture.marchStart],
      fixture.leapEnd,
      fixture.leapEnd.month
    );

    expect(cells.map(({ current }) => current)).toEqual([
      CALENDAR_PRESENTATION.CURRENT_DATE,
      null,
    ]);
  });
});
