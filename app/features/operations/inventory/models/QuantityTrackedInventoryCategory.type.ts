import { INVENTORY_TRACKING_MODE } from "@/app/constants";
import type { InventoryCategorySummary } from "./InventoryCategorySummary.interface";

export type QuantityTrackedInventoryCategory =
  InventoryCategorySummary & {
    trackingMode: typeof INVENTORY_TRACKING_MODE.BY_QUANTITY;
  };
