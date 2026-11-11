import { PAGINATION } from "@/app/constants";
import type { NullableUndefined } from "@/app/types";

export const resolveReservationsByWorkerPageIndex = (
  pageParameter: NullableUndefined<string | string[]>
): number => {
  const firstPageParameter = Array.isArray(pageParameter)
    ? pageParameter[PAGINATION.DEFAULT_PAGE]
    : pageParameter;

  if (firstPageParameter === undefined) {
    return PAGINATION.DEFAULT_PAGE;
  }

  const pageIndex = Number(firstPageParameter);

  return Number.isSafeInteger(pageIndex) &&
    pageIndex >= PAGINATION.DEFAULT_PAGE
    ? pageIndex
    : PAGINATION.DEFAULT_PAGE;
};
