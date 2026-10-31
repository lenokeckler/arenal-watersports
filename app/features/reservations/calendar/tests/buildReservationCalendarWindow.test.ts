import { describe, expect, it } from "vitest";
import type { CalendarPeriod } from "@/app/components/calendar/models/CalendarPeriod.interface";
import { CALENDAR_VIEW, PAGINATION } from "@/app/constants";
import { buildReservationCalendarWindow } from "../utils/buildReservationCalendarWindow";

const DAY_PERIOD: CalendarPeriod = {
  days: [],
  end: { year: 2026, month: 10, day: 14 },
  months: [],
  start: { year: 2026, month: 10, day: 14 },
  view: CALENDAR_VIEW.DAY,
};

describe("buildReservationCalendarWindow", (): void => {
  it("creates a half-open Costa Rica civil day window", (): void => {
    expect(
      buildReservationCalendarWindow(
        DAY_PERIOD,
        PAGINATION.DEFAULT_PAGE
      )
    ).toEqual({
      endsAt: "2026-10-15T00:00:00-06:00",
      page: PAGINATION.DEFAULT_PAGE,
      startsAt: "2026-10-14T00:00:00-06:00",
    });
  });
});
