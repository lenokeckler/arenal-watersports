import type { NullableRef } from "@/app/types";
import { DEFAULT_DURATION_MINUTES_MAX } from "../constants/CategoryBehaviorValidation.constants";

export const parseDefaultDurationMinutes = (
  durationText: string
): NullableRef<number> => {
  const parsedDuration = Number(durationText.trim());
  const isValidDuration =
    Number.isInteger(parsedDuration) &&
    parsedDuration > 0 &&
    parsedDuration <= DEFAULT_DURATION_MINUTES_MAX;

  return isValidDuration ? parsedDuration : null;
};
