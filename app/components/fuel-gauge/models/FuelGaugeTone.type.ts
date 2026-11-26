import type { FUEL_GAUGE_TONE } from "../constants/FuelGauge.constants";

export type FuelGaugeTone =
  (typeof FUEL_GAUGE_TONE)[keyof typeof FUEL_GAUGE_TONE];
