import { getCostaRicaDayRange } from "./getCostaRicaDayRange";

export const isSameCostaRicaDay = (
  first: Date,
  second: Date
): boolean =>
  getCostaRicaDayRange(first).date ===
  getCostaRicaDayRange(second).date;
