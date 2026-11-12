import type { NullableRef } from "@/app/types";
import { parseClockTime } from "@/app/components/dispatch-board/utils/parseClockTime";
import { OFFSET_CR_MS } from "@/app/utils/generators/dateConversion";
import { CLOSE_GROUP_ARRIVAL_TIME } from "../constants/CloseGroup.constants";

export const buildArrivalInstant = (
  arrivalTime: string,
  now: Date
): NullableRef<Date> => {
  const arrivalMinutes = parseClockTime(arrivalTime);

  if (arrivalMinutes === null) {
    return null;
  }

  const costaRicaNow = new Date(
    now.getTime() - OFFSET_CR_MS
  );
  const dayStartMs =
    Date.UTC(
      costaRicaNow.getUTCFullYear(),
      costaRicaNow.getUTCMonth(),
      costaRicaNow.getUTCDate()
    ) + OFFSET_CR_MS;

  return new Date(
    dayStartMs +
      arrivalMinutes *
        CLOSE_GROUP_ARRIVAL_TIME.MS_PER_MINUTE
  );
};
