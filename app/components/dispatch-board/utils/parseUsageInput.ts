import type { NullableRef } from "@/app/types";
import { DISPATCH_READING_PATTERN } from "../constants/DispatchSheet.constants";
import { isValidUsageReading } from "./isValidUsageReading";

export const parseUsageInput = (
  text: string
): NullableRef<number> => {
  const trimmed = text.trim();

  if (!DISPATCH_READING_PATTERN.USAGE.test(trimmed)) {
    return null;
  }

  const usage = Number(
    trimmed.replace(
      DISPATCH_READING_PATTERN.DECIMAL_COMMA,
      DISPATCH_READING_PATTERN.DECIMAL_POINT
    )
  );

  return isValidUsageReading(usage) ? usage : null;
};
