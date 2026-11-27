import { STRING } from "@/app/constants";
import type { NullableUndefined } from "@/app/types";
import { DEPOSIT_RESOLUTION_LIMITS } from "../constants/DepositResolutionLimits.constants";
import { DEPOSIT_RESOLUTION_REASON_CONTROL_PATTERN } from "../constants/DepositResolutionReasonPatterns.constants";
import { DEPOSIT_RESOLUTION_VALIDATION_COPY as COPY } from "../constants/DepositResolutionValidationCopy.constants";
import { trimDepositResolutionReason } from "./trimDepositResolutionReason";

export const resolveDepositResolutionReasonError = (
  reasonText: string,
  isRequired: boolean
): NullableUndefined<string> => {
  const trimmed = trimDepositResolutionReason(reasonText);
  if (trimmed === STRING.Empty) {
    return isRequired ? COPY.REASON_REQUIRED : undefined;
  }
  if (
    DEPOSIT_RESOLUTION_REASON_CONTROL_PATTERN.test(trimmed)
  ) {
    return COPY.REASON_DISALLOWED_CHARACTERS;
  }
  return [...trimmed].length >
    DEPOSIT_RESOLUTION_LIMITS.REASON_MAX_LENGTH
    ? COPY.REASON_TOO_LONG
    : undefined;
};
