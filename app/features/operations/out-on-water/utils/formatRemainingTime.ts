import { OUT_ON_WATER_COPY } from "../constants/OutOnWaterCopy.constants";
import { formatDuration } from "./formatDuration";

export const formatRemainingTime = (
  remainingMinutes: number
): string => {
  if (remainingMinutes > 0) {
    return `${OUT_ON_WATER_COPY.REMAINING_PREFIX}${formatDuration(remainingMinutes)}`;
  }

  if (remainingMinutes === 0) {
    return OUT_ON_WATER_COPY.OVERDUE_NOW;
  }

  return `${OUT_ON_WATER_COPY.OVERDUE_PREFIX}${formatDuration(-remainingMinutes)}`;
};
