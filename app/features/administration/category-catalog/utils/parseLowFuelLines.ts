import type { NullableRef } from "@/app/types";
import { LOW_FUEL_LINES_LIMITS } from "../constants/CategoryBehaviorValidation.constants";

export const parseLowFuelLines = (
  linesText: string
): NullableRef<number> => {
  const parsedLines = Number(linesText.trim());
  const isValidLines =
    Number.isInteger(parsedLines) &&
    parsedLines >= LOW_FUEL_LINES_LIMITS.MIN &&
    parsedLines <= LOW_FUEL_LINES_LIMITS.MAX;

  return isValidLines ? parsedLines : null;
};
