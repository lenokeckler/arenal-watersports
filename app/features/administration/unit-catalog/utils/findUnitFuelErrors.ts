import { STRING } from "@/app/constants";
import { UNIT_FORM_ERROR_COPY } from "../constants/UnitFormErrorCopy.constants";
import { UNIT_FORM_LIMITS } from "../constants/UnitFormLimits.constants";
import type { UnitFormErrors } from "../models/UnitFormErrors.interface";
import type { UnitFormValues } from "../models/UnitFormValues.interface";
import { parseUnitInteger } from "./parseUnitInteger";

const { FUEL_LEVEL_MIN, FUEL_MAX_MAX, FUEL_MAX_MIN } =
  UNIT_FORM_LIMITS;

export const findUnitFuelErrors = (
  values: Pick<UnitFormValues, "fuelMax" | "fuelLevel">
): Pick<UnitFormErrors, "fuelMax" | "fuelLevel"> => {
  const errors: Pick<
    UnitFormErrors,
    "fuelMax" | "fuelLevel"
  > = {};
  const fuelMax = parseUnitInteger(values.fuelMax);
  const isFuelMaxValid =
    fuelMax !== null &&
    fuelMax >= FUEL_MAX_MIN &&
    fuelMax <= FUEL_MAX_MAX;
  if (!isFuelMaxValid) {
    errors.fuelMax = UNIT_FORM_ERROR_COPY.FUEL_MAX_INVALID;
  }

  if (values.fuelLevel.trim() === STRING.Empty) {
    return errors;
  }
  const fuelLevel = parseUnitInteger(values.fuelLevel);
  if (fuelLevel === null || fuelLevel < FUEL_LEVEL_MIN) {
    errors.fuelLevel =
      UNIT_FORM_ERROR_COPY.FUEL_LEVEL_INVALID;
    return errors;
  }
  const ceiling = isFuelMaxValid ? fuelMax : FUEL_MAX_MAX;
  if (fuelLevel > ceiling) {
    errors.fuelLevel =
      UNIT_FORM_ERROR_COPY.FUEL_LEVEL_ABOVE_MAX;
  }
  return errors;
};
