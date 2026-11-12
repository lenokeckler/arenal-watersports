import { DURATION_ADJUST_COPY } from "../constants/OutOnWaterCopy.constants";
import { OUT_ON_WATER_COPY } from "../constants/OutOnWaterCopy.constants";

export const formatDelta = (delta: number): string =>
  `${delta > 0 ? DURATION_ADJUST_COPY.PRESET_PLUS : DURATION_ADJUST_COPY.PRESET_MINUS}${Math.abs(delta)}${OUT_ON_WATER_COPY.MINUTES_SUFFIX}`;
