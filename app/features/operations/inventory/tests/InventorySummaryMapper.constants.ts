import { INVENTORY_TRACKING_MODE } from "@/app/constants";
import type { InventorySummaryDatabaseRow } from "@/app/services/operations/inventory/models/InventoryReadModels.interface";
import type { InventoryCategorySummary } from "../models/InventoryCategorySummary.interface";

export const INVENTORY_UNIT_SUMMARY_ROW: InventorySummaryDatabaseRow =
  {
    category_id: "aaaaaaaa-0000-0000-0000-000000000001",
    category_name: "Jet Ski",
    is_reservable: true,
    quantity_available: 2,
    quantity_damaged: 1,
    quantity_in_maintenance: 1,
    quantity_in_repair: 0,
    quantity_total: 4,
    tracking_mode: INVENTORY_TRACKING_MODE.BY_UNIT,
  };

export const INVENTORY_QUANTITY_SUMMARY_ROW: InventorySummaryDatabaseRow =
  {
    category_id: "aaaaaaaa-0000-0000-0000-000000000002",
    category_name: "Chaleco",
    is_reservable: false,
    quantity_available: 10,
    quantity_damaged: 2,
    quantity_in_maintenance: 0,
    quantity_in_repair: 3,
    quantity_total: 15,
    tracking_mode: INVENTORY_TRACKING_MODE.BY_QUANTITY,
  };

export const INVENTORY_BOAT_SUMMARY_ROW: InventorySummaryDatabaseRow =
  {
    category_id: "aaaaaaaa-0000-0000-0000-000000000003",
    category_name: "Lancha",
    is_reservable: true,
    quantity_available: 2,
    quantity_damaged: 0,
    quantity_in_maintenance: 0,
    quantity_in_repair: 0,
    quantity_total: 2,
    tracking_mode: INVENTORY_TRACKING_MODE.BY_UNIT,
  };

export const INVENTORY_SUMMARY_ROWS: InventorySummaryDatabaseRow[] =
  [
    INVENTORY_UNIT_SUMMARY_ROW,
    INVENTORY_QUANTITY_SUMMARY_ROW,
    INVENTORY_BOAT_SUMMARY_ROW,
  ];

export const INVALID_INVENTORY_SUMMARY_ROW: InventorySummaryDatabaseRow =
  {
    category_id: null,
    category_name: null,
    is_reservable: null,
    quantity_available: null,
    quantity_damaged: null,
    quantity_in_maintenance: null,
    quantity_in_repair: null,
    quantity_total: null,
    tracking_mode: null,
  };

export const REQUIRED_INVENTORY_SUMMARY_FIELDS: (keyof InventorySummaryDatabaseRow)[] =
  [
    "category_id",
    "category_name",
    "quantity_available",
    "quantity_damaged",
    "quantity_in_maintenance",
    "quantity_in_repair",
    "quantity_total",
    "tracking_mode",
  ];

export const EXPECTED_INVENTORY_SUMMARIES: InventoryCategorySummary[] =
  [
    {
      id: "aaaaaaaa-0000-0000-0000-000000000001",
      name: "Jet Ski",
      trackingMode: INVENTORY_TRACKING_MODE.BY_UNIT,
      available: 2,
      damaged: 1,
      inMaintenance: 1,
      inRepair: 0,
      total: 4,
    },
    {
      id: "aaaaaaaa-0000-0000-0000-000000000002",
      name: "Chaleco",
      trackingMode: INVENTORY_TRACKING_MODE.BY_QUANTITY,
      available: 10,
      damaged: 2,
      inMaintenance: 0,
      inRepair: 3,
      total: 15,
    },
    {
      id: "aaaaaaaa-0000-0000-0000-000000000003",
      name: "Lancha",
      trackingMode: INVENTORY_TRACKING_MODE.BY_UNIT,
      available: 2,
      damaged: 0,
      inMaintenance: 0,
      inRepair: 0,
      total: 2,
    },
  ];
