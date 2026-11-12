import type { InventoryPage } from "./InventoryPage.model";
import type { QuantityTrackedInventoryCategory } from "./QuantityTrackedInventoryCategory.type";
import type { InventoryStockMovement } from "@/app/services/operations/inventory/models/InventoryStockMovement.interface";

export interface InventoryStockManagementSectionProps {
  category: QuantityTrackedInventoryCategory;
  movementPage: InventoryPage<InventoryStockMovement>;
}
