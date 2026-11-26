import {
  COMBO_ITEM_QUANTITY_PATTERN,
  COMBO_ITEM_QUANTITY_STEP,
} from "../constants/ComboItemQuantity.constants";

export const stepComboItemQuantity = (
  quantityText: string,
  step: number
): string => {
  const trimmed = quantityText.trim();
  const current = COMBO_ITEM_QUANTITY_PATTERN.test(trimmed)
    ? Number(trimmed)
    : COMBO_ITEM_QUANTITY_STEP.MIN - step;

  return Math.max(
    COMBO_ITEM_QUANTITY_STEP.MIN,
    current + step
  ).toString();
};
