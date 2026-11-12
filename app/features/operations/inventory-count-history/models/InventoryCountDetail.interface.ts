import type { InventoryCountContentCategory } from "./InventoryCountContent.interface";
import type { InventoryCountDifferences } from "./InventoryCountDifferences.interface";
import type { InventoryCountSummary } from "./InventoryCountSummary.interface";

export interface InventoryCountDetail extends InventoryCountDifferences {
  categories: InventoryCountContentCategory[];
  summary: InventoryCountSummary;
}
