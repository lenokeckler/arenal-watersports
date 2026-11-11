import {
  DURATION_ADJUST_PATTERN,
  OUT_ON_WATER_DURATION,
} from "../constants/OutOnWater.constants";
import type { NullableRef } from "@/app/types";

export const parseDurationMinutes = (
  text: string
): NullableRef<number> => {
  if (!DURATION_ADJUST_PATTERN.test(text)) {
    return null;
  }

  const minutes = Number(text);

  return minutes >= OUT_ON_WATER_DURATION.MIN_MINUTES &&
    minutes <= OUT_ON_WATER_DURATION.MAX_MINUTES
    ? minutes
    : null;
};
