import { parseStockQuantity } from "./parseStockQuantity";

export const toCountableStockQuantity = (
  text: string
): number => {
  const quantity = parseStockQuantity(text);

  return Number.isNaN(quantity) ? 0 : quantity;
};
