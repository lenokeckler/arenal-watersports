import { UUID_PATTERN } from "@/app/constants";
import {
  UNIT_READINGS_ERROR,
  UNIT_READINGS_LIMITS,
  UNIT_READINGS_STATUS,
} from "../constants/UnitReadings.constants";
import type { UnitCorrectionInput } from "../models/UnitCorrectionInput.interface";

const STATUSES: readonly string[] = Object.values(
  UNIT_READINGS_STATUS
);

const isWholeBetween = (
  value: number,
  min: number,
  max: number
): boolean =>
  Number.isInteger(value) && value >= min && value <= max;

const hasTwoDecimalsAtMost = (value: number): boolean =>
  Math.abs(value * 100 - Math.round(value * 100)) < 1e-6;

export const validateUnitCorrectionInput = (
  input: UnitCorrectionInput
): void => {
  const isValid =
    UUID_PATTERN.test(input.unitId) &&
    STATUSES.includes(input.status) &&
    isWholeBetween(
      input.fuelMax,
      UNIT_READINGS_LIMITS.FUEL_MAX_MIN,
      UNIT_READINGS_LIMITS.FUEL_MAX_MAX
    ) &&
    isWholeBetween(input.fuelLevel, 0, input.fuelMax) &&
    isWholeBetween(
      input.impactCount,
      0,
      UNIT_READINGS_LIMITS.IMPACTS_MAX
    ) &&
    Number.isFinite(input.usageTotal) &&
    input.usageTotal >= 0 &&
    input.usageTotal <= UNIT_READINGS_LIMITS.USAGE_MAX &&
    hasTwoDecimalsAtMost(input.usageTotal);

  if (!isValid) {
    throw new RangeError(UNIT_READINGS_ERROR.INVALID_INPUT);
  }
};
