import type { CustomComboEquipmentSelection } from "../models/CustomComboEquipmentSelection.interface";

const isPositiveInteger = (value: number): boolean =>
  Number.isInteger(value) && value > 0;

export const hasValidCustomComboEquipmentSelections = (
  selections: CustomComboEquipmentSelection[]
): boolean => {
  const categoryIds = selections.map((selection) =>
    selection.categoryId.trim()
  );

  return (
    categoryIds.length > 0 &&
    categoryIds.every(Boolean) &&
    new Set(categoryIds).size === categoryIds.length &&
    selections.every((selection) =>
      isPositiveInteger(selection.quantity)
    )
  );
};
