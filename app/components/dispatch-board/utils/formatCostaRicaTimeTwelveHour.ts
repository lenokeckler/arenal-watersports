import { FORMAT_DATE } from "@/app/constants";
import { OFFSET_CR_MS } from "@/app/utils/generators/dateConversion";
import { DISPATCH_BOARD_TIME_FORMAT } from "../constants/DispatchBoard.constants";

export const formatCostaRicaTimeTwelveHour = (
  instant: Date | string
): string => {
  const costaRicaDate = new Date(
    new Date(instant).getTime() - OFFSET_CR_MS
  );
  const hours24 = costaRicaDate.getUTCHours();
  const hours12 =
    hours24 % DISPATCH_BOARD_TIME_FORMAT.HALF_DAY_HOURS ||
    DISPATCH_BOARD_TIME_FORMAT.HALF_DAY_HOURS;
  const minutes = String(
    costaRicaDate.getUTCMinutes()
  ).padStart(FORMAT_DATE.PAD_LENGTH, FORMAT_DATE.PAD_CHAR);
  const meridiem =
    hours24 >= DISPATCH_BOARD_TIME_FORMAT.HALF_DAY_HOURS
      ? DISPATCH_BOARD_TIME_FORMAT.PM
      : DISPATCH_BOARD_TIME_FORMAT.AM;

  return `${hours12}${DISPATCH_BOARD_TIME_FORMAT.SEPARATOR}${minutes} ${meridiem}`;
};
