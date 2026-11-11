import { FUEL_GAUGE_TIER } from "../constants/FuelGauge.constants";
import type { FuelGaugeTier } from "../models/FuelGaugeTier.type";

export const getFuelGaugeTier = (
  level: number,
  max: number
): FuelGaugeTier => {
  if (level <= max * FUEL_GAUGE_TIER.LOW_FRACTION) {
    return FUEL_GAUGE_TIER.LOW;
  }

  return level <= max * FUEL_GAUGE_TIER.MEDIUM_FRACTION
    ? FUEL_GAUGE_TIER.MEDIUM
    : FUEL_GAUGE_TIER.HIGH;
};
