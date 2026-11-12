import { INVENTORY_TRACKING_MODE } from "@/app/constants";
import type { InventoryCategorySummary } from "./InventoryCategorySummary.interface";

export type UnitTrackedInventoryCategory =
  InventoryCategorySummary & {
    trackingMode: typeof INVENTORY_TRACKING_MODE.BY_UNIT;
  };
