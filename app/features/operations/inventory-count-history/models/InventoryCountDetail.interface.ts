import type { InventoryCountDifferences } from "./InventoryCountDifferences.interface";
import type { InventoryCountSummary } from "./InventoryCountSummary.interface";

export interface InventoryCountDetail extends InventoryCountDifferences {
  summary: InventoryCountSummary;
}
