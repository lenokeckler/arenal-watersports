import type { InventoryFilters } from "./InventoryFilters.interface";
import type { InventoryCategorySummary } from "./InventoryCategorySummary.interface";
import type { InventoryPage } from "./InventoryPage.model";

export interface InventoryOverviewViewProps {
  filters?: InventoryFilters;
  inventoryPage: InventoryPage<InventoryCategorySummary>;
}
