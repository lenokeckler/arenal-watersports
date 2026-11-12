import { FORMAT_DATE } from "@/app/constants";
import { OFFSET_CR_MS } from "@/app/utils/generators/dateConversion";
import { DISPATCH_BOARD_TIME_FORMAT } from "../constants/DispatchBoard.constants";

export const formatCostaRicaTime = (
  instant: Date | string
): string => {
  const costaRicaDate = new Date(
    new Date(instant).getTime() - OFFSET_CR_MS
  );
  const hours = String(
    costaRicaDate.getUTCHours()
  ).padStart(FORMAT_DATE.PAD_LENGTH, FORMAT_DATE.PAD_CHAR);
  const minutes = String(
    costaRicaDate.getUTCMinutes()
  ).padStart(FORMAT_DATE.PAD_LENGTH, FORMAT_DATE.PAD_CHAR);

  return `${hours}${DISPATCH_BOARD_TIME_FORMAT.SEPARATOR}${minutes}`;
};
