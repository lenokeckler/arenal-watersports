import { OFFSET_CR_MS } from "@/app/utils/generators/dateConversion";
import type { CostaRicaDayRange } from "../models/CostaRicaDayRange.interface";

export const getCostaRicaDayRange = (
  currentDate: Date
): CostaRicaDayRange => {
  const costaRicaDate = new Date(
    currentDate.getTime() - OFFSET_CR_MS
  );
  const year = costaRicaDate.getUTCFullYear();
  const month = costaRicaDate.getUTCMonth();
  const day = costaRicaDate.getUTCDate();

  return {
    startsAt: new Date(
      Date.UTC(year, month, day) + OFFSET_CR_MS
    ).toISOString(),
    endsAt: new Date(
      Date.UTC(year, month, day + 1) + OFFSET_CR_MS
    ).toISOString(),
  };
};
