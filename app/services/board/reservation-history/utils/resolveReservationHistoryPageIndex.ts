import {
  PAGINATION,
  POSTGRES_INTEGER_MAX,
} from "@/app/constants";
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

  const pageIndex = pageNumber - PAGINATION.ONE_PAGE;

  return Number.isSafeInteger(pageNumber) &&
    pageIndex >= PAGINATION.DEFAULT_PAGE &&
    pageIndex <= POSTGRES_INTEGER_MAX
    ? pageIndex
    : PAGINATION.DEFAULT_PAGE;
};
