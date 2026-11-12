import type { NullableRef } from "@/app/types";
import { UNIT_INTEGER_PATTERN } from "../constants/UnitFormLimits.constants";

export const parseUnitInteger = (
  integerText: string
): NullableRef<number> => {
  const trimmedText = integerText.trim();
  return UNIT_INTEGER_PATTERN.test(trimmedText)
    ? Number(trimmedText)
    : null;
};
