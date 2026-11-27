import {
  OIL_REMAINING_COPY,
  OIL_REMAINING_FORMAT,
} from "@/app/constants";
import type { Database } from "@/app/types";

export const formatOilRemaining = (
  remaining: number,
  metric: Database["public"]["Enums"]["usage_metric"]
): string => {
  const amount = Math.abs(remaining).toLocaleString(
    OIL_REMAINING_FORMAT.LOCALE,
    OIL_REMAINING_FORMAT.OPTIONS
  );
  const sign =
    remaining < 0 ? OIL_REMAINING_COPY.PAST_SIGN : "";

  return `${sign}${amount}${OIL_REMAINING_COPY.UNIT[metric]}`;
};
