import { PAGINATION } from "@/app/constants";
import type { NullableUndefined } from "@/app/types";
import { readFirstSearchParam } from "./readFirstSearchParam";

export const resolveReservationHistoryPageIndex = (
  rawParam: NullableUndefined<string | string[]>
): number => {
  const firstParam = readFirstSearchParam(rawParam);

  if (firstParam === undefined) {
    return PAGINATION.DEFAULT_PAGE;
  }

  const pageNumber = Number(firstParam);

  return Number.isSafeInteger(pageNumber) &&
    pageNumber >= PAGINATION.ONE_PAGE
    ? pageNumber - PAGINATION.ONE_PAGE
    : PAGINATION.DEFAULT_PAGE;
};
