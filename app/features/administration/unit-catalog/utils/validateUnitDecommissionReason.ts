import { STRING } from "@/app/constants";
import type { NullableUndefined } from "@/app/types";
import { UNIT_FORM_ERROR_COPY } from "../constants/UnitFormErrorCopy.constants";
import { UNIT_FORM_LIMITS } from "../constants/UnitFormLimits.constants";

export const validateUnitDecommissionReason = (
  reason: string
): NullableUndefined<string> => {
  const trimmedReason = reason.trim();
  if (trimmedReason === STRING.Empty) {
    return UNIT_FORM_ERROR_COPY.REASON_REQUIRED;
  }
  return trimmedReason.length >
    UNIT_FORM_LIMITS.REASON_MAX_LENGTH
    ? UNIT_FORM_ERROR_COPY.REASON_TOO_LONG
    : undefined;
};
