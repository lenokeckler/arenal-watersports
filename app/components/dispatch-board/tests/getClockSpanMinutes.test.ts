import { describe, expect, it } from "vitest";
import { getClockSpanMinutes } from "../utils/getClockSpanMinutes";
import { DISPATCH_WINDOW_FIXTURE } from "./DispatchSheetTest.constants";
import {
  DISPATCH_CLOCK_FIXTURE,
  DISPATCH_MINUTES_FIXTURE,
} from "./DispatchSheetTest.constants";

describe("getClockSpanMinutes", () => {
  it("measures a return later the same day", () => {
    expect(
      getClockSpanMinutes(
        DISPATCH_WINDOW_FIXTURE.SAME_DAY.departureTime,
        DISPATCH_WINDOW_FIXTURE.SAME_DAY.returnTime
      )
    ).toBe(DISPATCH_MINUTES_FIXTURE.NINETY);
  });

  it("reads an earlier return as the next day", () => {
    expect(
      getClockSpanMinutes(
        DISPATCH_WINDOW_FIXTURE.AFTER_MIDNIGHT
          .departureTime,
        DISPATCH_WINDOW_FIXTURE.AFTER_MIDNIGHT.returnTime
      )
    ).toBe(DISPATCH_MINUTES_FIXTURE.AFTER_MIDNIGHT_SPAN);
  });

  it("reads the same time as a full day", () => {
    expect(
      getClockSpanMinutes(
        DISPATCH_WINDOW_FIXTURE.SAME_TIME.departureTime,
        DISPATCH_WINDOW_FIXTURE.SAME_TIME.returnTime
      )
    ).toBe(DISPATCH_MINUTES_FIXTURE.FULL_DAY);
  });

  it("is not a number when a time is invalid", () => {
    expect(
      getClockSpanMinutes(
        DISPATCH_CLOCK_FIXTURE.NOT_A_TIME,
        DISPATCH_CLOCK_FIXTURE.MIDNIGHT
      )
    ).toBeNaN();
  });
});
