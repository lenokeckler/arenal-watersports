import { describe, expect, it } from "vitest";
import { CALENDAR_HEAT_LEVEL } from "@/app/components/calendar/constants/CalendarHeatLevel.constants";
import { buildReservationCalendarHeatMap } from "../utils/buildReservationCalendarHeatMap";
import { RESERVATIONS_CALENDAR_SELECTION as fixture } from "./ReservationsCalendarSelection.constants";

describe("buildReservationCalendarHeatMap", () => {
  it("counts a multi-day reservation in each intersecting day", () => {
    const heatMap = buildReservationCalendarHeatMap(
      fixture.MULTIDAY_SNAPSHOT
    );

    expect(
      heatMap.getDayHeatLevel(fixture.OCTOBER_DATE)
    ).toBe(CALENDAR_HEAT_LEVEL.GREEN);
    expect(
      heatMap.getDayHeatLevel(fixture.MULTIDAY_LAST_DATE)
    ).toBe(CALENDAR_HEAT_LEVEL.GREEN);
    expect(
      heatMap.getDayReservationCount(fixture.OCTOBER_DATE)
    ).toBe(1);
    expect(
      heatMap.getDayReservationCount(
        fixture.MULTIDAY_LAST_DATE
      )
    ).toBe(1);
  });

  it("does not imply heat levels for incomplete results", () => {
    const heatMap = buildReservationCalendarHeatMap(
      fixture.INCOMPLETE_SNAPSHOT
    );

    expect(
      heatMap.getDayHeatLevel(fixture.OCTOBER_DATE)
    ).toBe(CALENDAR_HEAT_LEVEL.NONE);
    expect(
      heatMap.getDayReservationCount(fixture.OCTOBER_DATE)
    ).toBeUndefined();
  });

  it("reports zero reservations for a covered empty day", () => {
    const heatMap = buildReservationCalendarHeatMap(
      fixture.SNAPSHOT
    );

    expect(
      heatMap.getDayReservationCount(
        fixture.EMPTY_OCTOBER_DATE
      )
    ).toBe(0);
  });

  it("does not imply heat outside complete but partial coverage", () => {
    const heatMap = buildReservationCalendarHeatMap(
      fixture.PARTIAL_COVERAGE_SNAPSHOT
    );

    expect(
      heatMap.getDayHeatLevel(fixture.OCTOBER_DATE)
    ).toBe(CALENDAR_HEAT_LEVEL.GREEN);
    expect(
      heatMap.getDayHeatLevel(fixture.OUTSIDE_COVERAGE_DATE)
    ).toBe(CALENDAR_HEAT_LEVEL.NONE);
    expect(
      heatMap.getDayReservationCount(
        fixture.OUTSIDE_COVERAGE_DATE
      )
    ).toBeUndefined();
  });
});
