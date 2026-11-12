import type { InventoryPage } from "./InventoryPage.model";
import type { InventoryStockMovement } from "@/app/services/operations/inventory/models/InventoryStockMovement.interface";

export interface InventoryStockMovementHistorySectionProps {
  categoryId: string;
  movementPage: InventoryPage<InventoryStockMovement>;
}
