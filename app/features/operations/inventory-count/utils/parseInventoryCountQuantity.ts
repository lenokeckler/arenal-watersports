import { INVENTORY_COUNT_LIMITS } from "../constants/InventoryCount.constants";

const QUANTITY_PATTERN = new RegExp(
  `^\\d{1,${INVENTORY_COUNT_LIMITS.QUANTITY_MAX_DIGITS}}$`
);

export const parseInventoryCountQuantity = (
  value: string
): number | null => {
  const trimmed = value.trim();

  return QUANTITY_PATTERN.test(trimmed)
    ? Number(trimmed)
    : null;
};
