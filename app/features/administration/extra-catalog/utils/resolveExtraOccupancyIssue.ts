import type { NullableUndefined } from "@/app/types";
import { EXTRA_OCCUPANCY_COPY } from "../constants/ExtraOccupancyCopy.constants";
import { isExtraOccupancyBlank } from "./isExtraOccupancyBlank";
import { isExtraOccupancyQuantity } from "./isExtraOccupancyQuantity";
import { isUuidText } from "./isUuidText";

export const resolveExtraOccupancyIssue = (
  categoryId: unknown,
  quantity: unknown
): NullableUndefined<string> => {
  const isCategoryBlank = isExtraOccupancyBlank(categoryId);
  const isQuantityBlank = isExtraOccupancyBlank(quantity);

  if (isCategoryBlank && isQuantityBlank) {
    return undefined;
  }
  if (isCategoryBlank || isQuantityBlank) {
    return EXTRA_OCCUPANCY_COPY.INCOMPLETE_ERROR;
  }
  if (!isUuidText(categoryId)) {
    return EXTRA_OCCUPANCY_COPY.CATEGORY_ERROR;
  }
  return isExtraOccupancyQuantity(quantity)
    ? undefined
    : EXTRA_OCCUPANCY_COPY.QUANTITY_ERROR;
};
