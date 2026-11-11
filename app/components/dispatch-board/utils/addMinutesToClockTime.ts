import { FORMAT_DATE, TIME } from "@/app/constants";
import { DISPATCH_BOARD_TIME_FORMAT } from "../constants/DispatchBoard.constants";
import { DISPATCH_SHEET_TIME } from "../constants/DispatchSheet.constants";
import { parseClockTime } from "./parseClockTime";

export const addMinutesToClockTime = (
  clockTime: string,
  minutes: number
): string => {
  const startMinutes = parseClockTime(clockTime);

  if (startMinutes === null) {
    return clockTime;
  }

  const totalMinutes =
    (((startMinutes + minutes) %
      DISPATCH_SHEET_TIME.MINUTES_IN_DAY) +
      DISPATCH_SHEET_TIME.MINUTES_IN_DAY) %
    DISPATCH_SHEET_TIME.MINUTES_IN_DAY;
  const hours = String(
    Math.floor(totalMinutes / TIME.UNITS.MINUTES_IN_HOUR)
  ).padStart(FORMAT_DATE.PAD_LENGTH, FORMAT_DATE.PAD_CHAR);
  const remainder = String(
    totalMinutes % TIME.UNITS.MINUTES_IN_HOUR
  ).padStart(FORMAT_DATE.PAD_LENGTH, FORMAT_DATE.PAD_CHAR);

  return `${hours}${DISPATCH_BOARD_TIME_FORMAT.SEPARATOR}${remainder}`;
};
