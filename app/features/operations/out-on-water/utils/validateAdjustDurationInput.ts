import { UUID_PATTERN } from "@/app/constants";
import {
  OUT_ON_WATER_DURATION,
  OUT_ON_WATER_ERROR,
} from "../constants/OutOnWater.constants";
import type { AdjustDurationInput } from "../models/AdjustDurationInput.interface";

export const validateAdjustDurationInput = (
  input: AdjustDurationInput
): void => {
  const isValid =
    UUID_PATTERN.test(input.dispatchId) &&
    Number.isInteger(input.durationMinutes) &&
    input.durationMinutes >=
      OUT_ON_WATER_DURATION.MIN_MINUTES &&
    input.durationMinutes <=
      OUT_ON_WATER_DURATION.MAX_MINUTES;

  if (!isValid) {
    throw new RangeError(
      OUT_ON_WATER_ERROR.INVALID_ADJUSTMENT
    );
  }
};
