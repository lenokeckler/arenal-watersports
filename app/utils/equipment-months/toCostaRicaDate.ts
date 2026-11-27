import { getCostaRicaDayRange } from "@/app/utils/costa-rica-day/getCostaRicaDayRange";

export const toCostaRicaDate = (
  instant: Date | string
): string => getCostaRicaDayRange(new Date(instant)).date;
