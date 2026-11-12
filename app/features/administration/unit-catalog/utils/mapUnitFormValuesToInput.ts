import { parseMoneyAmount } from "@/app/utils/money/parseMoneyAmount";
import { UNIT_FORM_ERROR_COPY } from "../constants/UnitFormErrorCopy.constants";
import { UNIT_MOTORLESS_DEFAULTS } from "../constants/UnitMotorlessDefaults.constants";
import type { UnitFields } from "../models/UnitFields.interface";
import type { UnitFormRules } from "../models/UnitFormRules.interface";
import type { UnitFormValues } from "../models/UnitFormValues.interface";
import type { UnitMotorFields } from "../models/UnitMotorFields.interface";
import { parseUnitInteger } from "./parseUnitInteger";
import { requireUnitNumber } from "./requireUnitNumber";

const mapMotorFields = (
  values: UnitFormValues
): UnitMotorFields => ({
  fuelMax: requireUnitNumber(
    parseUnitInteger(values.fuelMax),
    UNIT_FORM_ERROR_COPY.FUEL_MAX_INVALID
  ),
  fuelLevel: parseUnitInteger(values.fuelLevel),
  usageTotal: requireUnitNumber(
    parseMoneyAmount(values.usageTotal),
    UNIT_FORM_ERROR_COPY.USAGE_REQUIRED
  ),
  nextOilChangeAt: parseMoneyAmount(values.nextOilChangeAt),
});

export const mapUnitFormValuesToInput = (
  values: UnitFormValues,
  rules: UnitFormRules
): UnitFields => ({
  code: values.code.trim(),
  status: values.status,
  ...(rules.hasMotor
    ? mapMotorFields(values)
    : UNIT_MOTORLESS_DEFAULTS),
});
