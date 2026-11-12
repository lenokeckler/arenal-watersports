import { STRING } from "@/app/constants";
import type { NullableUndefined } from "@/app/types";
import { UNIT_FORM_ERROR_COPY } from "../constants/UnitFormErrorCopy.constants";
import { UNIT_FORM_LIMITS } from "../constants/UnitFormLimits.constants";

export const findUnitCodeError = (
  code: string
): NullableUndefined<string> => {
  const trimmedCode = code.trim();
  if (trimmedCode === STRING.Empty) {
    return UNIT_FORM_ERROR_COPY.CODE_REQUIRED;
  }
  return trimmedCode.length >
    UNIT_FORM_LIMITS.CODE_MAX_LENGTH
    ? UNIT_FORM_ERROR_COPY.CODE_TOO_LONG
    : undefined;
};
