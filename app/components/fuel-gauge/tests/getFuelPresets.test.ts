import { describe, expect, it } from "vitest";
import { FUEL_PRESET_ID } from "../constants/FuelGauge.constants";
import { getFuelPresets } from "../utils/getFuelPresets";
import { FUEL_GAUGE_FIXTURE } from "./FuelGaugeTest.constants";

describe("getFuelPresets", () => {
  it("gives a quarter, a half, three quarters and full on a gauge of four", () => {
    expect(
      getFuelPresets(FUEL_GAUGE_FIXTURE.FOUR_LINES)
    ).toEqual([
      { id: FUEL_PRESET_ID.QUARTER, level: 1 },
      { id: FUEL_PRESET_ID.HALF, level: 2 },
      { id: FUEL_PRESET_ID.THREE_QUARTERS, level: 3 },
      { id: FUEL_PRESET_ID.FULL, level: 4 },
    ]);
  });

  it("scales the fractions to the lines of a gauge of six", () => {
    expect(
      getFuelPresets(FUEL_GAUGE_FIXTURE.SIX_LINES).map(
        ({ level }) => level
      )
    ).toEqual([2, 3, 5, 6]);
  });

  it("keeps only the shortcuts a small gauge can show honestly", () => {
    expect(
      getFuelPresets(FUEL_GAUGE_FIXTURE.TWO_LINES)
    ).toEqual([
      { id: FUEL_PRESET_ID.HALF, level: 1 },
      { id: FUEL_PRESET_ID.FULL, level: 2 },
    ]);
  });

  it("offers only full on a gauge of one line", () => {
    expect(
      getFuelPresets(FUEL_GAUGE_FIXTURE.ONE_LINE)
    ).toEqual([{ id: FUEL_PRESET_ID.FULL, level: 1 }]);
  });

  it("never repeats a level", () => {
    const levels = getFuelPresets(
      FUEL_GAUGE_FIXTURE.THREE_LINES
    ).map(({ level }) => level);

    expect(new Set(levels).size).toBe(levels.length);
  });
});
