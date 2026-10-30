import { describe, expect, it } from "vitest";
import {
  CALENDAR_ALLOWED_VIEWS,
  CALENDAR_WORK_AREA,
} from "@/app/constants";
import { getAllowedCalendarViews } from "../getAllowedCalendarViews";

describe("getAllowedCalendarViews", () => {
  it("limits the verified operations area to day and week", () => {
    expect(
      getAllowedCalendarViews(CALENDAR_WORK_AREA.OPERATIONS)
    ).toEqual(CALENDAR_ALLOWED_VIEWS.OPERATIONS);
  });

  it("allows all calendar views for the verified reservations area", () => {
    expect(
      getAllowedCalendarViews(
        CALENDAR_WORK_AREA.RESERVATIONS
      )
    ).toEqual(CALENDAR_ALLOWED_VIEWS.RESERVATIONS);
  });

  it("returns no calendar views for the administration area", () => {
    expect(
      getAllowedCalendarViews(
        CALENDAR_WORK_AREA.ADMINISTRATION
      )
    ).toEqual([]);
  });
});
