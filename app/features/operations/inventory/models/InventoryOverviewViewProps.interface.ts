import type { InventoryCategorySummary } from "./InventoryCategorySummary.interface";
import type { InventoryPage } from "./InventoryPage.model";

export interface InventoryOverviewViewProps {
  inventoryPage: InventoryPage<InventoryCategorySummary>;
}
