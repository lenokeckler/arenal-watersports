import { describe, expect, it } from "vitest";
import { FUEL_GAUGE_TONE } from "../constants/FuelGauge.constants";
import { getFuelGaugeTone } from "../utils/getFuelGaugeTone";
import { getNextFuelLevel } from "../utils/getNextFuelLevel";
import { FUEL_GAUGE_FIXTURE } from "./FuelGaugeTest.constants";

describe("getFuelGaugeTone", () => {
  it.each([
    [FUEL_GAUGE_FIXTURE.EMPTY, 1, FUEL_GAUGE_TONE.EMPTY],
    [FUEL_GAUGE_FIXTURE.ONE_LINE, 1, FUEL_GAUGE_TONE.LOW],
    [FUEL_GAUGE_FIXTURE.TWO_LINES, 1, FUEL_GAUGE_TONE.OK],
    [FUEL_GAUGE_FIXTURE.TWO_LINES, 2, FUEL_GAUGE_TONE.LOW],
    [FUEL_GAUGE_FIXTURE.THREE_LINES, 2, FUEL_GAUGE_TONE.OK],
  ])(
    "reads level %i with a warning of %i lines as %s",
    (level, lowLines, tone) => {
      expect(getFuelGaugeTone(level, lowLines)).toBe(tone);
    }
  );

  it("draws a unit without a reading with the normal color", () => {
    expect(getFuelGaugeTone(null, 1)).toBe(
      FUEL_GAUGE_TONE.OK
    );
  });
});

describe("getNextFuelLevel", () => {
  it("sets the tapped line as the level", () => {
    expect(
      getNextFuelLevel(
        FUEL_GAUGE_FIXTURE.TWO_LINES,
        FUEL_GAUGE_FIXTURE.THREE_LINES
      )
    ).toBe(FUEL_GAUGE_FIXTURE.THREE_LINES);
  });

  it("lowers the level when the line of the current level is tapped again", () => {
    expect(
      getNextFuelLevel(
        FUEL_GAUGE_FIXTURE.TWO_LINES,
        FUEL_GAUGE_FIXTURE.TWO_LINES
      )
    ).toBe(FUEL_GAUGE_FIXTURE.ONE_LINE);
  });

  it("starts from nothing when there was no reading", () => {
    expect(
      getNextFuelLevel(null, FUEL_GAUGE_FIXTURE.TWO_LINES)
    ).toBe(FUEL_GAUGE_FIXTURE.TWO_LINES);
  });
});
