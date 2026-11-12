export interface InventoryStockMovement {
  actorName: string;
  availableFrom: number;
  availableTo: number;
  createdAt: string;
  damagedFrom: number;
  damagedTo: number;
  id: string;
  inRepairFrom: number;
  inRepairTo: number;
  reason: string;
}
