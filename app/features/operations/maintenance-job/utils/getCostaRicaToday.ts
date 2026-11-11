import { OFFSET_CR_MS } from "@/app/utils/generators/dateConversion";

const DATE_LENGTH = 10;

export const getCostaRicaToday = (now: Date): string =>
  new Date(now.getTime() - OFFSET_CR_MS)
    .toISOString()
    .slice(0, DATE_LENGTH);
