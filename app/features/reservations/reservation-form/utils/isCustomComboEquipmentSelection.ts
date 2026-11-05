import type { CustomComboEquipmentSelection } from "../models/CustomComboEquipmentSelection.interface";

export const isCustomComboEquipmentSelection = (
  input: unknown
): input is CustomComboEquipmentSelection => {
  if (typeof input !== "object" || input === null) {
    return false;
  }

  return (
    "categoryId" in input &&
    typeof input.categoryId === "string" &&
    "quantity" in input &&
    typeof input.quantity === "number"
  );
};
