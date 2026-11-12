import { STRING } from "@/app/constants";
import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";
import { STOCK_REASON_COPY } from "../constants/StockReasonCopy.constants";
import type { StockMovementCard } from "../models/StockMovementCard.interface";
import type { StockMovementItem } from "../models/StockMovementItem.interface";
import { formatStockChangedStates } from "./formatStockChangedStates";
import { formatStockMovementDate } from "./formatStockMovementDate";
import { formatStockValueChange } from "./formatStockValueChange";

export const buildStockMovementCard = (
  movement: StockMovementItem
): StockMovementCard => ({
  changesText: formatStockChangedStates(movement),
  dateText: formatStockMovementDate(movement.createdAt),
  id: movement.id,
  reasonLabel:
    STOCK_REASON_COPY[movement.reason] ?? movement.reason,
  totalText: [
    STOCK_COUNT_COPY.MOVEMENT_TOTAL_LABEL,
    formatStockValueChange(
      movement.totalFrom,
      movement.totalTo
    ),
  ].join(STRING.SPACE),
});
