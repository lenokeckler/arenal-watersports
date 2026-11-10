import type { CustomComboPricingInput } from "../models/CustomComboPricingInput.interface";
import { isCustomComboEquipmentSelection } from "./isCustomComboEquipmentSelection";

export const isCustomComboPricingInput = (
  input: unknown
): input is CustomComboPricingInput => {
  if (typeof input !== "object" || input === null) {
    return false;
  }

  return (
    "durationHours" in input &&
    typeof input.durationHours === "number" &&
    "items" in input &&
    Array.isArray(input.items) &&
    input.items.every(isCustomComboEquipmentSelection)
  );
};
