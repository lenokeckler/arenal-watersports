import type { NullableRef } from "@/app/types";
import { OFFSET_CR_MS } from "@/app/utils/generators/dateConversion";
import { DISPATCH_SHEET_TIME } from "../constants/DispatchSheet.constants";
import type { DispatchWindow } from "../models/DispatchWindow.interface";
import type { DispatchWindowInput } from "../models/DispatchWindowInput.interface";
import { getClockSpanMinutes } from "./getClockSpanMinutes";
import { parseClockTime } from "./parseClockTime";

export const buildDispatchWindow = ({
  departureTime,
  now,
  returnTime,
}: DispatchWindowInput): NullableRef<DispatchWindow> => {
  const departureMinutes = parseClockTime(departureTime);
  const spanMinutes = getClockSpanMinutes(
    departureTime,
    returnTime
  );

  if (
    departureMinutes === null ||
    Number.isNaN(spanMinutes)
  ) {
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
  const departureMs =
    dayStartMs +
    departureMinutes *
      DISPATCH_SHEET_TIME.MILLISECONDS_IN_MINUTE;

  return {
    departureAt: new Date(departureMs).toISOString(),
    returnsAt: new Date(
      departureMs +
        spanMinutes *
          DISPATCH_SHEET_TIME.MILLISECONDS_IN_MINUTE
    ).toISOString(),
  };
};
