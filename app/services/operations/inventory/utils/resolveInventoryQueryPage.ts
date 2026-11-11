import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import { PAGINATION } from "@/app/constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { INVENTORY_RANGE_ERROR } from "../constants/InventoryRangeError.constants";
import type { InventoryDataPage } from "../models/InventoryReadModels.interface";
import { createInventoryDataPage } from "./inventoryPagination";

type InventoryPageReader<TItem> = (
  pageIndex: number
) => PromiseLike<PostgrestSingleResponse<TItem[]>>;

const readLastInventoryPage = async <TItem>(
  pageIndex: number,
  fallbackCount: number | null,
  operation: string,
  readPage: InventoryPageReader<TItem>
): Promise<InventoryDataPage<TItem>> => {
  const response = await readPage(pageIndex);

  if (
    response.error?.code ===
    INVENTORY_RANGE_ERROR.OUT_OF_RANGE
  ) {
    return createInventoryDataPage(
      [],
      fallbackCount,
      pageIndex
    );
  }

  throwIfSupabaseError(response.error, operation);
  return createInventoryDataPage(
    response.data ?? [],
    response.count ?? fallbackCount,
    pageIndex
  );
};

export const resolveInventoryQueryPage = async <TItem>(
  response: PostgrestSingleResponse<TItem[]>,
  pageIndex: number,
  operation: string,
  readPage: InventoryPageReader<TItem>
): Promise<InventoryDataPage<TItem>> => {
  if (
    response.error?.code !==
    INVENTORY_RANGE_ERROR.OUT_OF_RANGE
  ) {
    throwIfSupabaseError(response.error, operation);
    return createInventoryDataPage(
      response.data ?? [],
      response.count,
      pageIndex
    );
  }

  const firstPage = await readPage(PAGINATION.DEFAULT_PAGE);
  throwIfSupabaseError(firstPage.error, operation);
  const lastPageIndex = Math.max(
    PAGINATION.DEFAULT_PAGE,
    Math.ceil(
      (firstPage.count ?? PAGINATION.ZERO_RESULTS) /
        PAGINATION.DEFAULT_PAGE_SIZE
    ) - PAGINATION.ONE_PAGE
  );

  if (lastPageIndex === PAGINATION.DEFAULT_PAGE) {
    return createInventoryDataPage(
      firstPage.data ?? [],
      firstPage.count,
      PAGINATION.DEFAULT_PAGE
    );
  }

  return readLastInventoryPage(
    lastPageIndex,
    firstPage.count,
    operation,
    readPage
  );
};
