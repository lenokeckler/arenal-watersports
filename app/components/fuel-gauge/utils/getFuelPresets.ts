import {
  FUEL_GAUGE_LINE,
  FUEL_PARTIAL_PRESETS,
  FUEL_PRESET_ID,
  FUEL_PRESET_TOLERANCE,
} from "../constants/FuelGauge.constants";
import type { FuelPreset } from "../models/FuelPreset.interface";

export const getFuelPresets = (
  max: number
): FuelPreset[] => {
  const partial = FUEL_PARTIAL_PRESETS.map(
    ({ fraction, id }) => ({
      fraction,
      id,
      level: Math.round(max * fraction),
    })
  ).filter(
    ({ fraction, level }) =>
      level >= FUEL_GAUGE_LINE.FIRST &&
      level < max &&
      Math.abs(level / max - fraction) <=
        FUEL_PRESET_TOLERANCE
  );
  const distinct = partial.filter(
    (preset, index) =>
      partial.findIndex(
        ({ level }) => level === preset.level
      ) === index
  );

  return [
    ...distinct.map(({ id, level }) => ({ id, level })),
    { id: FUEL_PRESET_ID.FULL, level: max },
  ];
};
