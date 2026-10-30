import type { UnitFormErrors } from "../models/UnitFormErrors.interface";
import type { UnitFormRules } from "../models/UnitFormRules.interface";
import type { UnitFormValues } from "../models/UnitFormValues.interface";
import { findUnitCodeError } from "./findUnitCodeError";
import { findUnitDecimalError } from "./findUnitDecimalError";
import { findUnitFuelErrors } from "./findUnitFuelErrors";
import { findUnitStatusError } from "./findUnitStatusError";

export const validateUnitFormValues = (
  values: UnitFormValues,
  rules: UnitFormRules
): UnitFormErrors => {
  const errors: UnitFormErrors = {
    code: findUnitCodeError(values.code),
    status: findUnitStatusError(values.status),
  };
  if (rules.hasMotor) {
    Object.assign(errors, findUnitFuelErrors(values), {
      usageTotal: findUnitDecimalError(values.usageTotal),
      nextOilChangeAt: findUnitDecimalError(
        values.nextOilChangeAt
      ),
    });
  }
  return Object.fromEntries(
    Object.entries(errors).filter(([, message]) => message)
  );
};
