import type { StockMovementItem } from "../models/StockMovementItem.interface";
import type { StockMovementRow } from "../models/StockMovementRow.type";

export const mapStockMovementRowToItem = (
  movementRow: StockMovementRow
): StockMovementItem => ({
  availableFrom: movementRow.from_available,
  availableTo: movementRow.to_available,
  createdAt: movementRow.created_at,
  damagedFrom: movementRow.from_damaged,
  damagedTo: movementRow.to_damaged,
  id: movementRow.id,
  inRepairFrom: movementRow.from_in_repair,
  inRepairTo: movementRow.to_in_repair,
  reason: movementRow.reason,
  totalFrom:
    movementRow.from_available +
    movementRow.from_damaged +
    movementRow.from_in_repair,
  totalTo:
    movementRow.to_available +
    movementRow.to_damaged +
    movementRow.to_in_repair,
});
