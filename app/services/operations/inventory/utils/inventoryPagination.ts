import { PAGINATION } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type {
  InventoryDataPage,
  InventoryUnitDatabaseRow,
} from "../models/InventoryReadModels.interface";

export const normalizeInventoryPageIndex = (
  pageIndex: number
): number => {
  if (!Number.isFinite(pageIndex)) {
    return PAGINATION.DEFAULT_PAGE;
  }

  const normalizedPageIndex = Math.max(
    PAGINATION.DEFAULT_PAGE,
    Math.floor(pageIndex)
  );

  return Number.isSafeInteger(normalizedPageIndex)
    ? normalizedPageIndex
    : PAGINATION.DEFAULT_PAGE;
};

export const resolveInventoryPageRange = (
  pageIndex: number
) => {
  const resolvedPageIndex =
    normalizeInventoryPageIndex(pageIndex);
  const from =
    resolvedPageIndex * PAGINATION.DEFAULT_PAGE_SIZE;

  return {
    from,
    to:
      from +
      PAGINATION.DEFAULT_PAGE_SIZE -
      PAGINATION.ONE_PAGE,
  };
};

export const createInventoryDataPage = <TItem>(
  items: TItem[],
  totalCount: NullableRef<number>,
  pageIndex: number
): InventoryDataPage<TItem> => {
  const resolvedTotalCount =
    totalCount ?? PAGINATION.ZERO_RESULTS;
  const pageCount = Math.max(
    PAGINATION.ONE_PAGE,
    Math.ceil(
      resolvedTotalCount / PAGINATION.DEFAULT_PAGE_SIZE
    )
  );

  return {
    items,
    pageIndex,
    pageCount,
    totalCount: resolvedTotalCount,
  };
};

export const createEmptyInventoryUnitPage = (
  pageIndex: number
): InventoryDataPage<InventoryUnitDatabaseRow> =>
  createInventoryDataPage(
    [],
    PAGINATION.ZERO_RESULTS,
    pageIndex
  );
