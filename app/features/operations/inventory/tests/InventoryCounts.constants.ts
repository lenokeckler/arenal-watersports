import { INVENTORY_TRACKING_MODE } from "@/app/constants";
import type { InventoryCategorySummary } from "../models/InventoryCategorySummary.interface";

export const INVENTORY_UNIT_COUNTS_CATEGORY: InventoryCategorySummary =
  {
    id: "aaaaaaaa-0000-0000-0000-000000000001",
    inUse: 0,
    name: "Jet Ski",
    trackingMode: INVENTORY_TRACKING_MODE.BY_UNIT,
    available: 4,
    damaged: 1,
    inMaintenance: 1,
    inRepair: 2,
    total: 8,
  };

export const INVENTORY_QUANTITY_COUNTS_CATEGORY: InventoryCategorySummary =
  {
    id: "aaaaaaaa-0000-0000-0000-000000000002",
    inUse: 3,
    name: "Chaleco",
    trackingMode: INVENTORY_TRACKING_MODE.BY_QUANTITY,
    available: 10,
    damaged: 2,
    inMaintenance: 0,
    inRepair: 3,
    total: 15,
  };
