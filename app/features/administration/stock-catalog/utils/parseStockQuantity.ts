import { STOCK_QUANTITY_PATTERN } from "../constants/StockQuantityField.constants";

export const parseStockQuantity = (
  text: string
): number => {
  const trimmedText = text.trim();

  return STOCK_QUANTITY_PATTERN.test(trimmedText)
    ? Number(trimmedText)
    : Number.NaN;
};
