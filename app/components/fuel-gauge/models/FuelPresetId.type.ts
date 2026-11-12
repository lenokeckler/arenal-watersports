import type { FUEL_PRESET_ID } from "../constants/FuelGauge.constants";

export type FuelPresetId =
  (typeof FUEL_PRESET_ID)[keyof typeof FUEL_PRESET_ID];
