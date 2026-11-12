import {
  INVENTORY_TRACKING_MODE,
  PAGINATION,
} from "@/app/constants";
import type { InventoryCategoryDatabaseDetails } from "@/app/services/operations/inventory/models/InventoryReadModels.interface";
import {
  ACTIVE_INVENTORY_UNIT_ROWS,
  EXPECTED_MAPPED_INVENTORY_UNITS,
} from "./InventoryUnitMapper.constants";
import {
  INVENTORY_QUANTITY_SUMMARY_ROW,
  INVENTORY_UNIT_SUMMARY_ROW,
} from "./InventorySummaryMapper.constants";
import type { InventoryCategoryDetails } from "../models/InventoryCategoryDetails.type";
import type { InventoryStockMovement } from "@/app/services/operations/inventory/models/InventoryStockMovement.interface";

export const INVENTORY_STOCK_MOVEMENT: InventoryStockMovement =
  {
    actorName: "Operations User",
    availableFrom: 12,
    availableTo: 10,
    createdAt: "2026-11-07T15:00:00.000Z",
    damagedFrom: 1,
    damagedTo: 2,
    id: "bbbbbbbb-0000-4000-8000-000000000001",
    inRepairFrom: 0,
    inRepairTo: 0,
    reason: "count_correction",
  };

const EMPTY_INVENTORY_UNITS = {
  items: [],
  pageIndex: PAGINATION.DEFAULT_PAGE,
  pageCount: PAGINATION.ONE_PAGE,
  totalCount: PAGINATION.ZERO_RESULTS,
};

export const UNIT_INVENTORY_CATEGORY_DETAILS: InventoryCategoryDatabaseDetails =
  {
    movements: null,
    summary: INVENTORY_UNIT_SUMMARY_ROW,
    units: {
      items: ACTIVE_INVENTORY_UNIT_ROWS,
      pageIndex: PAGINATION.DEFAULT_PAGE,
      pageCount: PAGINATION.ONE_PAGE,
      totalCount: ACTIVE_INVENTORY_UNIT_ROWS.length,
    },
  };

export const QUANTITY_INVENTORY_CATEGORY_DETAILS: InventoryCategoryDatabaseDetails =
  {
    movements: {
      items: [INVENTORY_STOCK_MOVEMENT],
      pageIndex: PAGINATION.DEFAULT_PAGE,
      pageCount: PAGINATION.ONE_PAGE,
      totalCount: 1,
    },
    summary: INVENTORY_QUANTITY_SUMMARY_ROW,
    units: EMPTY_INVENTORY_UNITS,
  };

export const MISSING_INVENTORY_CATEGORY_DETAILS: InventoryCategoryDatabaseDetails =
  {
    movements: null,
    summary: null,
    units: EMPTY_INVENTORY_UNITS,
  };

export const EXPECTED_UNIT_CATEGORY_DETAILS_ERROR =
  "Expected unit inventory category details.";
export const EXPECTED_QUANTITY_CATEGORY_DETAILS_ERROR =
  "Expected quantity inventory category details.";
export const EXPECTED_INVENTORY_UNIT_ROW_ERROR =
  "Expected an inventory unit row.";

export const EXPECTED_UNIT_INVENTORY_CATEGORY_DETAILS: InventoryCategoryDetails =
  {
    category: {
      id: "aaaaaaaa-0000-0000-0000-000000000001",
      inUse: 1,
      name: "Jet Ski",
      trackingMode: INVENTORY_TRACKING_MODE.BY_UNIT,
      available: 2,
      damaged: 1,
      inMaintenance: 1,
      inRepair: 0,
      total: 4,
    },
    units: {
      items: EXPECTED_MAPPED_INVENTORY_UNITS,
      pageIndex: PAGINATION.DEFAULT_PAGE,
      pageCount: PAGINATION.ONE_PAGE,
      totalCount: EXPECTED_MAPPED_INVENTORY_UNITS.length,
    },
  };

export const EXPECTED_QUANTITY_INVENTORY_CATEGORY_DETAILS: InventoryCategoryDetails =
  {
    category: {
      id: "aaaaaaaa-0000-0000-0000-000000000002",
      inUse: 0,
      name: "Chaleco",
      trackingMode: INVENTORY_TRACKING_MODE.BY_QUANTITY,
      available: 10,
      damaged: 2,
      inMaintenance: 0,
      inRepair: 3,
      total: 15,
    },
    movements: {
      items: [INVENTORY_STOCK_MOVEMENT],
      pageIndex: PAGINATION.DEFAULT_PAGE,
      pageCount: PAGINATION.ONE_PAGE,
      totalCount: 1,
    },
  };
