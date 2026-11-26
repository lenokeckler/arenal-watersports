import { UUID_PATTERN } from "@/app/constants";
import {
  CATEGORY_UNIT_LIMITS,
  CATEGORY_UNIT_UPDATE_ERROR,
} from "../constants/CategoryUnits.constants";
import type { BoardUnitCorrectionInput } from "../models/BoardUnitCorrectionInput.interface";

const isWholeBetween = (
  value: number,
  min: number,
  max: number
): boolean =>
  Number.isInteger(value) && value >= min && value <= max;

export const validateBoardUnitCorrectionInput = (
  input: BoardUnitCorrectionInput
): void => {
  const isValid =
    UUID_PATTERN.test(input.unitId) &&
    isWholeBetween(
      input.fuelMax,
      1,
      CATEGORY_UNIT_LIMITS.FUEL_MAX_MAX
    ) &&
    isWholeBetween(input.fuelLevel, 0, input.fuelMax) &&
    isWholeBetween(
      input.impactCount,
      CATEGORY_UNIT_LIMITS.IMPACT_COUNT_MIN,
      CATEGORY_UNIT_LIMITS.IMPACT_COUNT_MAX
    ) &&
    Number.isFinite(input.usageTotal) &&
    input.usageTotal >= 0 &&
    input.usageTotal <= CATEGORY_UNIT_LIMITS.USAGE_MAX;

  if (!isValid) {
    throw new RangeError(
      CATEGORY_UNIT_UPDATE_ERROR.INVALID_INPUT
    );
  }
};
