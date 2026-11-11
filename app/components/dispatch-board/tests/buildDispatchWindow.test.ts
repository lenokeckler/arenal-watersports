import { describe, expect, it } from "vitest";
import { buildDispatchWindow } from "../utils/buildDispatchWindow";
import {
  DISPATCH_CLOCK_FIXTURE,
  DISPATCH_WINDOW_FIXTURE,
} from "./DispatchSheetTest.constants";

describe("buildDispatchWindow", () => {
  it("builds the departure and return of today in Costa Rica", () => {
    expect(
      buildDispatchWindow({
        departureTime:
          DISPATCH_WINDOW_FIXTURE.SAME_DAY.departureTime,
        now: DISPATCH_WINDOW_FIXTURE.NOW,
        returnTime:
          DISPATCH_WINDOW_FIXTURE.SAME_DAY.returnTime,
      })
    ).toEqual({
      departureAt:
        DISPATCH_WINDOW_FIXTURE.SAME_DAY.departureAt,
      returnsAt: DISPATCH_WINDOW_FIXTURE.SAME_DAY.returnsAt,
    });
  });

  it("reads a return before the departure as the next day", () => {
    expect(
      buildDispatchWindow({
        departureTime:
          DISPATCH_WINDOW_FIXTURE.AFTER_MIDNIGHT
            .departureTime,
        now: DISPATCH_WINDOW_FIXTURE.NOW,
        returnTime:
          DISPATCH_WINDOW_FIXTURE.AFTER_MIDNIGHT.returnTime,
      })
    ).toEqual({
      departureAt:
        DISPATCH_WINDOW_FIXTURE.AFTER_MIDNIGHT.departureAt,
      returnsAt:
        DISPATCH_WINDOW_FIXTURE.AFTER_MIDNIGHT.returnsAt,
    });
  });

  it("uses the Costa Rica day when UTC is already tomorrow", () => {
    expect(
      buildDispatchWindow({
        departureTime:
          DISPATCH_CLOCK_FIXTURE.NOW_COSTA_RICA,
        now: DISPATCH_WINDOW_FIXTURE.NOW_LATE_EVENING,
        returnTime: DISPATCH_CLOCK_FIXTURE.NOW_COSTA_RICA,
      })?.departureAt
    ).toBe("2026-09-05T15:00:00.000Z");
  });

  it("gives no window for an invalid time", () => {
    expect(
      buildDispatchWindow({
        departureTime: DISPATCH_CLOCK_FIXTURE.NOT_A_TIME,
        now: DISPATCH_WINDOW_FIXTURE.NOW,
        returnTime: DISPATCH_CLOCK_FIXTURE.MORNING,
      })
    ).toBeNull();
  });
});
