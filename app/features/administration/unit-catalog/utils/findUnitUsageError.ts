import { STRING } from "@/app/constants";
import type { NullableUndefined } from "@/app/types";
import { UNIT_FORM_ERROR_COPY } from "../constants/UnitFormErrorCopy.constants";
import { findUnitDecimalError } from "./findUnitDecimalError";

export const findUnitUsageError = (
  usageText: string
): NullableUndefined<string> =>
  usageText.trim() === STRING.Empty
    ? UNIT_FORM_ERROR_COPY.USAGE_REQUIRED
    : findUnitDecimalError(usageText);
