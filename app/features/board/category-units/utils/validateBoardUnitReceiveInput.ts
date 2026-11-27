import { STRING, UUID_PATTERN } from "@/app/constants";
import {
  CATEGORY_UNIT_LIMITS,
  CATEGORY_UNIT_RECEIVE,
  CATEGORY_UNIT_UPDATE_ERROR,
} from "../constants/CategoryUnits.constants";
import type { BoardUnitReceiveInput } from "../models/BoardUnitReceiveInput.interface";

const isWholeBetween = (
  value: number,
  min: number,
  max: number
): boolean =>
  Number.isInteger(value) && value >= min && value <= max;

const hasValidDamage = ({
  damageDescription,
  hasDamage,
}: BoardUnitReceiveInput): boolean =>
  !hasDamage ||
  (damageDescription.trim() !== STRING.Empty &&
    damageDescription.length <=
      CATEGORY_UNIT_RECEIVE.DAMAGE_MAX_LENGTH);

export const validateBoardUnitReceiveInput = (
  input: BoardUnitReceiveInput
): void => {
  const isValid =
    UUID_PATTERN.test(input.unitId) &&
    (input.fuelLevel === null ||
      isWholeBetween(input.fuelLevel, 0, input.fuelMax)) &&
    (input.usageTotal === null ||
      (Number.isFinite(input.usageTotal) &&
        input.usageTotal >= 0 &&
        input.usageTotal <=
          CATEGORY_UNIT_LIMITS.USAGE_MAX)) &&
    isWholeBetween(
      input.impactCount,
      CATEGORY_UNIT_LIMITS.IMPACT_COUNT_MIN,
      CATEGORY_UNIT_LIMITS.IMPACT_COUNT_MAX
    ) &&
    hasValidDamage(input);

  if (!isValid) {
    throw new RangeError(
      CATEGORY_UNIT_UPDATE_ERROR.INVALID_INPUT
    );
  }
};
