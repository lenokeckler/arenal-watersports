import type { UnitMotorFields } from "../models/UnitMotorFields.interface";
import { UNIT_FORM_LIMITS } from "./UnitFormLimits.constants";

export const UNIT_MOTORLESS_DEFAULTS: UnitMotorFields = {
  fuelLevel: null,
  fuelMax: UNIT_FORM_LIMITS.FUEL_MAX_DEFAULT,
  nextOilChangeAt: null,
  usageTotal: 0,
};
