import { describe, expect, it } from "vitest";
import { FUEL_GAUGE_TIER } from "../constants/FuelGauge.constants";
import { getFuelGaugeTier } from "../utils/getFuelGaugeTier";
import { FUEL_GAUGE_TIER_FIXTURE } from "./FuelGaugeTest.constants";

describe("getFuelGaugeTier", () => {
  it.each([
    [FUEL_GAUGE_TIER_FIXTURE.EMPTY, FUEL_GAUGE_TIER.LOW],
    [
      FUEL_GAUGE_TIER_FIXTURE.LOW_OF_FOUR,
      FUEL_GAUGE_TIER.LOW,
    ],
    [
      FUEL_GAUGE_TIER_FIXTURE.HALF_OF_FOUR,
      FUEL_GAUGE_TIER.MEDIUM,
    ],
    [
      FUEL_GAUGE_TIER_FIXTURE.OVER_HALF_OF_FOUR,
      FUEL_GAUGE_TIER.HIGH,
    ],
    [FUEL_GAUGE_TIER_FIXTURE.MAX, FUEL_GAUGE_TIER.HIGH],
  ])("reads %i of four lines as %s", (level, tier) => {
    expect(
      getFuelGaugeTier(level, FUEL_GAUGE_TIER_FIXTURE.MAX)
    ).toBe(tier);
  });
});
