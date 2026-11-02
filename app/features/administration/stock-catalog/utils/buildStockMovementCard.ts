import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";
import { STOCK_REASON_COPY } from "../constants/StockReasonCopy.constants";
import type { StockMovementCard } from "../models/StockMovementCard.interface";
import type { StockMovementItem } from "../models/StockMovementItem.interface";
import { formatStockMovementDate } from "./formatStockMovementDate";
import { formatStockTransition } from "./formatStockTransition";

export const buildStockMovementCard = (
  movement: StockMovementItem
): StockMovementCard => ({
  dateText: formatStockMovementDate(movement.createdAt),
  id: movement.id,
  lines: [
    formatStockTransition(
      STOCK_COUNT_COPY.AVAILABLE_LABEL,
      movement.availableFrom,
      movement.availableTo
    ),
    formatStockTransition(
      STOCK_COUNT_COPY.DAMAGED_LABEL,
      movement.damagedFrom,
      movement.damagedTo
    ),
    formatStockTransition(
      STOCK_COUNT_COPY.IN_REPAIR_LABEL,
      movement.inRepairFrom,
      movement.inRepairTo
    ),
  ],
  reasonLabel:
    STOCK_REASON_COPY[movement.reason] ?? movement.reason,
  totalText: formatStockTransition(
    STOCK_COUNT_COPY.TOTAL_LABEL,
    movement.totalFrom,
    movement.totalTo
  ),
});
