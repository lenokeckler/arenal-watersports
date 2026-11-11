import { TIME } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { DISPATCH_SHEET_TIME } from "../constants/DispatchSheet.constants";

export const parseClockTime = (
  value: string
): NullableRef<number> => {
  const match =
    DISPATCH_SHEET_TIME.CLOCK_PATTERN.exec(value);

  if (!match) {
    return null;
  }

  return (
    Number(match[DISPATCH_SHEET_TIME.HOURS_GROUP]) *
      TIME.UNITS.MINUTES_IN_HOUR +
    Number(match[DISPATCH_SHEET_TIME.MINUTES_GROUP])
  );
};
