import { STRING } from "@/app/constants";
import { STOCK_COUNT_SYMBOL } from "../constants/StockCountSymbol.constants";

export const formatStockDelta = (
  difference: number
): string => {
  if (difference === 0 || Number.isNaN(difference)) {
    return STRING.Empty;
  }

  return difference > 0
    ? `${STOCK_COUNT_SYMBOL.PLUS}${difference}`
    : `${STOCK_COUNT_SYMBOL.MINUS}${Math.abs(difference)}`;
};
