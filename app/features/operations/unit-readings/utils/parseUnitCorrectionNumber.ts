import type { NullableRef } from "@/app/types";
import {
  UNIT_READINGS_DECIMAL_SEPARATOR,
  UNIT_READINGS_LIMITS,
  UNIT_READINGS_PATTERN,
} from "../constants/UnitReadings.constants";

export const parseWholeNumber = (
  text: string,
  max: number
): NullableRef<number> => {
  const trimmed = text.trim();

  if (!UNIT_READINGS_PATTERN.INTEGER.test(trimmed)) {
    return null;
  }

  const value = Number(trimmed);

  return value <= max ? value : null;
};

export const parseUsage = (
  text: string
): NullableRef<number> => {
  const trimmed = text.trim();

  if (!UNIT_READINGS_PATTERN.DECIMAL.test(trimmed)) {
    return null;
  }

  const value = Number(
    trimmed.replace(
      UNIT_READINGS_DECIMAL_SEPARATOR.COMMA,
      UNIT_READINGS_DECIMAL_SEPARATOR.POINT
    )
  );

  return value <= UNIT_READINGS_LIMITS.USAGE_MAX
    ? value
    : null;
};
