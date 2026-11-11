import { INVENTORY_CATEGORY_ID_PATTERN } from "../constants/InventoryCategoryId.constants";

export const isValidInventoryCategoryId = (
  categoryId: string
): boolean =>
  INVENTORY_CATEGORY_ID_PATTERN.test(categoryId);
