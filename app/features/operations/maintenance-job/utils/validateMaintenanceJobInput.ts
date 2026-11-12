import { UUID_PATTERN } from "@/app/constants";
import {
  MAINTENANCE_JOB_CURRENCY,
  MAINTENANCE_JOB_ERROR,
  MAINTENANCE_JOB_LIMITS,
  MAINTENANCE_JOB_PATTERN,
  MAINTENANCE_JOB_WORK_TYPE,
} from "../constants/MaintenanceJob.constants";
import type { MaintenanceJobInput } from "../models/MaintenanceJobInput.interface";

const WORK_TYPES: readonly string[] = Object.values(
  MAINTENANCE_JOB_WORK_TYPE
);

const CURRENCIES: readonly string[] = Object.values(
  MAINTENANCE_JOB_CURRENCY
);

const isMoney = (value: number): boolean =>
  Number.isFinite(value) &&
  value > 0 &&
  value <= MAINTENANCE_JOB_LIMITS.MAX_AMOUNT &&
  Math.abs(value * 100 - Math.round(value * 100)) < 1e-6;

export const validateMaintenanceJobInput = (
  input: MaintenanceJobInput
): void => {
  const isOilChange =
    input.workType === MAINTENANCE_JOB_WORK_TYPE.OIL_CHANGE;
  const hasCost =
    input.costAmount !== null ||
    input.costCurrency !== null;
  const isValid =
    UUID_PATTERN.test(input.unitId) &&
    WORK_TYPES.includes(input.workType) &&
    MAINTENANCE_JOB_PATTERN.DATE.test(input.performedAt) &&
    !Number.isNaN(new Date(input.performedAt).getTime()) &&
    input.description.length <=
      MAINTENANCE_JOB_LIMITS.DESCRIPTION_MAX_LENGTH &&
    (input.workType !== MAINTENANCE_JOB_WORK_TYPE.OTHER ||
      input.description.trim().length > 0) &&
    (!hasCost ||
      (input.costAmount !== null &&
        isMoney(input.costAmount) &&
        input.costCurrency !== null &&
        CURRENCIES.includes(input.costCurrency))) &&
    (isOilChange
      ? input.nextOilChangeAt !== null &&
        isMoney(input.nextOilChangeAt)
      : input.nextOilChangeAt === null);

  if (!isValid) {
    throw new RangeError(
      MAINTENANCE_JOB_ERROR.INVALID_INPUT
    );
  }
};
