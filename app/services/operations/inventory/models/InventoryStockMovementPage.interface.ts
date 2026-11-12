import type { InventoryStockMovement } from "./InventoryStockMovement.interface";

export interface InventoryStockMovementPage {
  items: InventoryStockMovement[];
  pageIndex: number;
  pageCount: number;
  totalCount: number;
}
