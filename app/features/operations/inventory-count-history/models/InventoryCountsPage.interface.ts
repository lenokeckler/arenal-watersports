import type { InventoryCountSummary } from "./InventoryCountSummary.interface";

export interface InventoryCountsPage {
  counts: InventoryCountSummary[];
  totalCount: number;
}
