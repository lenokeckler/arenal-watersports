import { describe, expect, it } from "vitest";
import { addMinutesToClockTime } from "../utils/addMinutesToClockTime";
import {
  DISPATCH_CLOCK_FIXTURE,
  DISPATCH_MINUTES_FIXTURE,
} from "./DispatchSheetTest.constants";

describe("addMinutesToClockTime", () => {
  it("adds minutes inside the same day", () => {
    expect(
      addMinutesToClockTime(
        DISPATCH_CLOCK_FIXTURE.MORNING,
        DISPATCH_MINUTES_FIXTURE.NINETY
      )
    ).toBe(DISPATCH_CLOCK_FIXTURE.MORNING_AFTER_NINETY);
  });

  it("wraps past midnight", () => {
    expect(
      addMinutesToClockTime(
        DISPATCH_CLOCK_FIXTURE.NIGHT,
        DISPATCH_MINUTES_FIXTURE.NINETY
      )
    ).toBe(DISPATCH_CLOCK_FIXTURE.NIGHT_AFTER_NINETY);
  });

  it("wraps backwards before midnight", () => {
    expect(
      addMinutesToClockTime(
        DISPATCH_CLOCK_FIXTURE.SHORT_START,
        DISPATCH_MINUTES_FIXTURE.TWENTY_MINUS
      )
    ).toBe(DISPATCH_CLOCK_FIXTURE.NIGHT_BEFORE_TWENTY);
  });

  it("keeps a value that is not a clock time", () => {
    expect(
      addMinutesToClockTime(
        DISPATCH_CLOCK_FIXTURE.NOT_A_TIME,
        DISPATCH_MINUTES_FIXTURE.NINETY
      )
    ).toBe(DISPATCH_CLOCK_FIXTURE.NOT_A_TIME);
  });
});
