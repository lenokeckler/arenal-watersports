import { PAGINATION } from "@/app/constants";
import type { InventoryPage } from "../models/InventoryPage.model";
import type { InventoryCategorySummary } from "../models/InventoryCategorySummary.interface";
import { mapInventorySummary } from "../utils/mapInventorySummary";
import { INVENTORY_SUMMARY_ROWS } from "./InventorySummaryMapper.constants";

export const INVENTORY_OVERVIEW_PAGE: InventoryPage<InventoryCategorySummary> =
  {
    items: INVENTORY_SUMMARY_ROWS.map(mapInventorySummary),
    pageIndex: PAGINATION.DEFAULT_PAGE,
    pageCount: PAGINATION.ONE_PAGE,
    totalCount: INVENTORY_SUMMARY_ROWS.length,
  };
