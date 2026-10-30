import { parseMoneyAmount } from "@/app/utils/money/parseMoneyAmount";
import { UNIT_MOTORLESS_DEFAULTS } from "../constants/UnitMotorlessDefaults.constants";
import type { UnitFields } from "../models/UnitFields.interface";
import type { UnitFormRules } from "../models/UnitFormRules.interface";
import type { UnitFormValues } from "../models/UnitFormValues.interface";
import type { UnitMotorFields } from "../models/UnitMotorFields.interface";
import { parseUnitInteger } from "./parseUnitInteger";

const mapMotorFields = (
  values: UnitFormValues
): UnitMotorFields => ({
  fuelMax:
    parseUnitInteger(values.fuelMax) ??
    UNIT_MOTORLESS_DEFAULTS.fuelMax,
  fuelLevel: parseUnitInteger(values.fuelLevel),
  usageTotal:
    parseMoneyAmount(values.usageTotal) ??
    UNIT_MOTORLESS_DEFAULTS.usageTotal,
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
