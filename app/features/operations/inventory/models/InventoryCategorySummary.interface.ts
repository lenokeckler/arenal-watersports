import type { InventoryTrackingMode } from "@/app/constants";

export interface InventoryCategorySummary {
  id: string;
  name: string;
  trackingMode: InventoryTrackingMode;
  available: number;
  damaged: number;
  inMaintenance: number;
  inRepair: number;
  total: number;
}
