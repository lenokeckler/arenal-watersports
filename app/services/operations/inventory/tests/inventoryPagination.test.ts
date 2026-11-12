import { expect, it, vi } from "vitest";
import { PAGINATION } from "@/app/constants";
import { normalizeInventoryPageIndex } from "../utils/inventoryPagination";
import { resolveInventoryQueryPage } from "../utils/resolveInventoryQueryPage";
import {
  INVENTORY_SERVICE_INVALID_PAGE_INDICES,
  INVENTORY_SERVICE_NORMALIZED_PAGE_INDICES,
  INVENTORY_SERVICE_OUT_OF_RANGE_OPERATION,
  INVENTORY_SERVICE_OUT_OF_RANGE_PAGE_INDEX,
  INVENTORY_SERVICE_OUT_OF_RANGE_RESULT,
  INVENTORY_SERVICE_SUMMARY_RESULT,
  INVENTORY_SERVICE_UNIT_SUMMARY_ROW,
} from "./InventoryReadService.constants";

it("normalizes invalid page indexes to non-negative integers", () => {
  const normalizedPageIndices =
    INVENTORY_SERVICE_INVALID_PAGE_INDICES.map(
      normalizeInventoryPageIndex
    );

  expect(normalizedPageIndices).toEqual(
    INVENTORY_SERVICE_NORMALIZED_PAGE_INDICES
  );
});

it("clamps an obsolete range to the last available page", async () => {
  const totalCount =
    PAGINATION.DEFAULT_PAGE_SIZE + PAGINATION.ONE_PAGE;
  const firstPage = {
    ...INVENTORY_SERVICE_SUMMARY_RESULT,
    count: totalCount,
  };
  const lastPage = {
    ...INVENTORY_SERVICE_SUMMARY_RESULT,
    data: [INVENTORY_SERVICE_UNIT_SUMMARY_ROW],
    count: totalCount,
  };
  const readPage = vi
    .fn()
    .mockResolvedValueOnce(firstPage)
    .mockResolvedValueOnce(lastPage);
  const result = await resolveInventoryQueryPage(
    INVENTORY_SERVICE_OUT_OF_RANGE_RESULT,
    INVENTORY_SERVICE_OUT_OF_RANGE_PAGE_INDEX,
    INVENTORY_SERVICE_OUT_OF_RANGE_OPERATION,
    readPage
  );

  expect(readPage).toHaveBeenNthCalledWith(
    PAGINATION.ONE_PAGE,
    PAGINATION.DEFAULT_PAGE
  );
  expect(readPage).toHaveBeenNthCalledWith(
    PAGINATION.ONE_PAGE + PAGINATION.ONE_PAGE,
    PAGINATION.ONE_PAGE
  );
  expect(result).toMatchObject({
    items: [INVENTORY_SERVICE_UNIT_SUMMARY_ROW],
    pageIndex: PAGINATION.ONE_PAGE,
    totalCount,
  });
});
