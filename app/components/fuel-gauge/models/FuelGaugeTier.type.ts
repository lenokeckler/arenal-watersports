import type { FUEL_GAUGE_TIER } from "../constants/FuelGauge.constants";

export type FuelGaugeTier =
  | typeof FUEL_GAUGE_TIER.HIGH
  | typeof FUEL_GAUGE_TIER.LOW
  | typeof FUEL_GAUGE_TIER.MEDIUM;
