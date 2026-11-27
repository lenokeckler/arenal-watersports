import { STRING } from "@/app/constants";
import { safeString } from "@/app/utils/safe-value/SafeValue";
import type { CreateExtraInput } from "../models/CreateExtraInput.interface";
import type { ExtraOccupancyColumns } from "../models/ExtraOccupancyColumns.interface";

export const mapExtraInputToOccupancyColumns = (
  input: CreateExtraInput
): ExtraOccupancyColumns => {
  const categoryId = safeString(
    input.occupiesCategoryId
  ).trim();
  if (categoryId === STRING.Empty) {
    return {
      occupies_category_id: null,
      occupies_quantity: null,
    };
  }

  return {
    occupies_category_id: categoryId,
    occupies_quantity: Number(
      safeString(input.occupiesQuantity).trim()
    ),
  };
};
