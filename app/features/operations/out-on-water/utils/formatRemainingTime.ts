import { OUT_ON_WATER_COPY } from "../constants/OutOnWaterCopy.constants";
import { formatDuration } from "./formatDuration";

export const formatRemainingTime = (
  remainingMinutes: number
): string =>
  `${OUT_ON_WATER_COPY.REMAINING_PREFIX}${formatDuration(remainingMinutes)}`;
