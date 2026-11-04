import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";
import { STOCK_COUNT_SYMBOL } from "../constants/StockCountSymbol.constants";
import type { StockMovementItem } from "../models/StockMovementItem.interface";
import { formatStockTransition } from "./formatStockTransition";

export const formatStockChangedStates = (
  movement: StockMovementItem
): string =>
  [
    {
      from: movement.availableFrom,
      label: STOCK_COUNT_COPY.AVAILABLE_LABEL,
      to: movement.availableTo,
    },
    {
      from: movement.damagedFrom,
      label: STOCK_COUNT_COPY.DAMAGED_LABEL,
      to: movement.damagedTo,
    },
    {
      from: movement.inRepairFrom,
      label: STOCK_COUNT_COPY.IN_REPAIR_LABEL,
      to: movement.inRepairTo,
    },
  ]
    .filter((state) => state.from !== state.to)
    .map((state) =>
      formatStockTransition(
        state.label,
        state.from,
        state.to
      )
    )
    .join(STOCK_COUNT_SYMBOL.CHANGE_SEPARATOR);
