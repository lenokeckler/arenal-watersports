import { UUID_PATTERN } from "@/app/constants";
import { isValidFuelLevel } from "@/app/components/dispatch-board/utils/isValidFuelLevel";
import { isValidUsageReading } from "@/app/components/dispatch-board/utils/isValidUsageReading";
import {
  CLOSE_GROUP_DAMAGE_CAUSE,
  CLOSE_GROUP_ERROR,
  CLOSE_GROUP_LIMITS,
} from "../constants/CloseGroup.constants";
import type { CloseGroupDamage } from "../models/CloseGroupDamage.interface";
import type { CloseGroupInput } from "../models/CloseGroupInput.interface";
import type { CloseGroupReturn } from "../models/CloseGroupReturn.interface";

const DAMAGE_CAUSES: readonly string[] = Object.values(
  CLOSE_GROUP_DAMAGE_CAUSE
);

const isValidDamage = (damage: CloseGroupDamage): boolean =>
  DAMAGE_CAUSES.includes(damage.cause) &&
  damage.description.trim().length > 0 &&
  damage.description.length <=
    CLOSE_GROUP_LIMITS.DESCRIPTION_MAX_LENGTH &&
  Number.isInteger(damage.impactDelta) &&
  damage.impactDelta >= 0 &&
  damage.impactDelta <= CLOSE_GROUP_LIMITS.IMPACT_MAX;

const isValidReturn = (value: CloseGroupReturn): boolean =>
  UUID_PATTERN.test(value.unitId) &&
  typeof value.maintenance === "boolean" &&
  (value.fuel === null || isValidFuelLevel(value.fuel)) &&
  (value.usage === null ||
    isValidUsageReading(value.usage)) &&
  (value.damage === null || isValidDamage(value.damage));

export const validateCloseGroupInput = (
  input: CloseGroupInput
): void => {
  const unitIds = input.returns.map(
    (value) => value.unitId
  );
  const isValid =
    UUID_PATTERN.test(input.dispatchId) &&
    !Number.isNaN(new Date(input.arrivedAt).getTime()) &&
    new Set(unitIds).size === unitIds.length &&
    input.returns.every(isValidReturn);

  if (!isValid) {
    throw new RangeError(CLOSE_GROUP_ERROR.INVALID_INPUT);
  }
};
