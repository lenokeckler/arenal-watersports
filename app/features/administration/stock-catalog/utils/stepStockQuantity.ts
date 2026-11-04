import { parseStockQuantity } from "./parseStockQuantity";

export const stepStockQuantity = (
  text: string,
  step: number
): string => {
  const quantity = parseStockQuantity(text);
  const baseQuantity = Number.isNaN(quantity)
    ? 0
    : quantity;

  return `${Math.max(0, baseQuantity + step)}`;
};
