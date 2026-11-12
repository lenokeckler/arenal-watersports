import { OUT_ON_WATER_DURATION } from "../constants/OutOnWater.constants";

export const applyDurationDelta = (
  minutes: number,
  delta: number
): number =>
  Math.min(
    OUT_ON_WATER_DURATION.MAX_MINUTES,
    Math.max(
      OUT_ON_WATER_DURATION.MIN_MINUTES,
      minutes + delta
    )
  );
