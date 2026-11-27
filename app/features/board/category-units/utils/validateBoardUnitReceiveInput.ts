import {
  DAMAGE_CAUSE_ORDER,
  STRING,
  TYPE_OF,
  UUID_PATTERN,
} from "@/app/constants";
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
  damageCause,
  damageDescription,
  detailLater,
  hasDamage,
}: BoardUnitReceiveInput): boolean => {
  if (!hasDamage) {
    return true;
  }

  const isKnownCause =
    damageCause !== null &&
    (DAMAGE_CAUSE_ORDER as readonly string[]).includes(
      damageCause
    );

  if (
    typeof detailLater !== TYPE_OF.BOOLEAN ||
    damageDescription.length >
      CATEGORY_UNIT_RECEIVE.DAMAGE_MAX_LENGTH
  ) {
    return false;
  }

  return detailLater
    ? damageCause === null || isKnownCause
    : isKnownCause &&
        damageDescription.trim() !== STRING.Empty;
};

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
