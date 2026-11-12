import { UNIT_FORM_ERROR_COPY } from "@/app/features/administration/unit-catalog/constants/UnitFormErrorCopy.constants";
import { UNIT_FORM_FIELD_ID } from "@/app/features/administration/unit-catalog/constants/UnitFormFieldId.constants";
import { UNIT_FORM_LIMITS } from "@/app/features/administration/unit-catalog/constants/UnitFormLimits.constants";
import type { UnitInvalidInputCase } from "../models/UnitInvalidInputCase.interface";

const OVERLONG_CODE = "X".repeat(
  UNIT_FORM_LIMITS.CODE_MAX_LENGTH + 1
);
const FUEL_LEVEL_ABOVE_DEFAULT_MAX = "5";
const NO_BARS = "0";

export const E2E_UNIT_INVALID_INPUT_CASES: UnitInvalidInputCase[] =
  [
    {
      errorText: UNIT_FORM_ERROR_COPY.CODE_REQUIRED,
      fieldId: UNIT_FORM_FIELD_ID.CODE,
      input: { code: "" },
      scenario: "empty-code",
    },
    {
      errorText: UNIT_FORM_ERROR_COPY.CODE_TOO_LONG,
      fieldId: UNIT_FORM_FIELD_ID.CODE,
      input: { code: OVERLONG_CODE },
      scenario: "long-code",
    },
    {
      errorText: UNIT_FORM_ERROR_COPY.FUEL_MAX_INVALID,
      fieldId: UNIT_FORM_FIELD_ID.FUEL_MAX,
      input: { fuelMax: NO_BARS },
      scenario: "no-bars",
    },
    {
      errorText: UNIT_FORM_ERROR_COPY.FUEL_LEVEL_ABOVE_MAX,
      fieldId: UNIT_FORM_FIELD_ID.FUEL_LEVEL,
      input: { fuelLevel: FUEL_LEVEL_ABOVE_DEFAULT_MAX },
      scenario: "fuel-above-max",
    },
  ];
