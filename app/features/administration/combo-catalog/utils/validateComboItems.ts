import { STRING } from "@/app/constants";
import type { NullableUndefined } from "@/app/types";
import { COMBO_FORM_COPY } from "../constants/ComboFormCopy.constants";
import { COMBO_ITEM_QUANTITY_PATTERN } from "../constants/ComboItemQuantity.constants";
import type { ComboFormItemErrors } from "../models/ComboFormItemErrors.interface";
import type { ComboFormItemValues } from "../models/ComboFormItemValues.interface";
import type { ComboItemsValidation } from "../models/ComboItemsValidation.interface";

const findCategoryError = (
  items: ComboFormItemValues[],
  index: number
): NullableUndefined<string> => {
  const { categoryId } = items[index];
  if (categoryId.trim() === STRING.Empty) {
    return COMBO_FORM_COPY.CATEGORY_REQUIRED_ERROR;
  }
  const isRepeated = items
    .slice(0, index)
    .some((earlier) => earlier.categoryId === categoryId);
  return isRepeated
    ? COMBO_FORM_COPY.CATEGORY_DUPLICATED_ERROR
    : undefined;
};

const validateItemRow = (
  items: ComboFormItemValues[],
  index: number
): ComboFormItemErrors => {
  const categoryError = findCategoryError(items, index);
  const isQuantityValid = COMBO_ITEM_QUANTITY_PATTERN.test(
    items[index].quantityText.trim()
  );

  return {
    ...(categoryError ? { categoryId: categoryError } : {}),
    ...(isQuantityValid
      ? {}
      : {
          quantity: COMBO_FORM_COPY.QUANTITY_INVALID_ERROR,
        }),
  };
};

export const validateComboItems = (
  items: ComboFormItemValues[]
): ComboItemsValidation => ({
  itemErrors: items.map((_item, index) =>
    validateItemRow(items, index)
  ),
  ...(items.length === 0
    ? { itemsError: COMBO_FORM_COPY.ITEMS_REQUIRED_ERROR }
    : {}),
});
