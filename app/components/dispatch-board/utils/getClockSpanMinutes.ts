import { DISPATCH_SHEET_TIME } from "../constants/DispatchSheet.constants";
import { parseClockTime } from "./parseClockTime";

export const getClockSpanMinutes = (
  fromTime: string,
  toTime: string
): number => {
  const from = parseClockTime(fromTime);
  const to = parseClockTime(toTime);

  if (from === null || to === null) {
    return Number.NaN;
  }

  const span =
    (((to - from) % DISPATCH_SHEET_TIME.MINUTES_IN_DAY) +
      DISPATCH_SHEET_TIME.MINUTES_IN_DAY) %
    DISPATCH_SHEET_TIME.MINUTES_IN_DAY;

  return span === 0
    ? DISPATCH_SHEET_TIME.MINUTES_IN_DAY
    : span;
};
