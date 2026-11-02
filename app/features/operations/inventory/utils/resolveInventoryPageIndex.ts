import { PAGINATION } from "@/app/constants";
import { resolveInventoryPageRange } from "@/app/services/operations/inventory/utils/inventoryPagination";
import type { InventoryPageParameter } from "../models/InventoryPageParameter.type";

export const resolveInventoryPageIndex = (
  pageParameter: InventoryPageParameter
): number => {
  const firstPageParameter = Array.isArray(pageParameter)
    ? pageParameter[PAGINATION.DEFAULT_PAGE]
    : pageParameter;

  if (firstPageParameter === undefined) {
    return PAGINATION.DEFAULT_PAGE;
  }

  const pageIndex = Number(firstPageParameter);

  if (
    !Number.isSafeInteger(pageIndex) ||
    pageIndex < PAGINATION.DEFAULT_PAGE
  ) {
    return PAGINATION.DEFAULT_PAGE;
  }

  const { from, to } = resolveInventoryPageRange(pageIndex);

  if (
    !Number.isSafeInteger(from) ||
    !Number.isSafeInteger(to)
  ) {
    return PAGINATION.DEFAULT_PAGE;
  }

  return pageIndex;
};
