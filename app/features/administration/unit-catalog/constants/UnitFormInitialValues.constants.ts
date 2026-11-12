import { STRING } from "@/app/constants";
import type { UnitFormValues } from "../models/UnitFormValues.interface";
import { UNIT_FORM_LIMITS } from "./UnitFormLimits.constants";
import { UNIT_STATUS } from "./UnitStatus.constants";

export const UNIT_FORM_INITIAL_VALUES: UnitFormValues = {
  code: STRING.Empty,
  status: UNIT_STATUS.AVAILABLE,
  fuelMax: UNIT_FORM_LIMITS.FUEL_MAX_DEFAULT.toString(),
  fuelLevel: STRING.Empty,
  usageTotal: STRING.Empty,
  nextOilChangeAt: STRING.Empty,
};
