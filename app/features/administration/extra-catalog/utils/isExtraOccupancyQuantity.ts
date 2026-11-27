import {
  EXTRA_OCCUPANCY_LIMITS,
  EXTRA_OCCUPANCY_QUANTITY_PATTERN,
} from "../constants/ExtraOccupancyLimits.constants";
import { isTextValue } from "./isTextValue";

export const isExtraOccupancyQuantity = (
  value: unknown
): boolean => {
  if (
    !isTextValue(value) ||
    !EXTRA_OCCUPANCY_QUANTITY_PATTERN.test(value.trim())
  ) {
    return false;
  }
  const quantity = Number(value.trim());

  return (
    quantity >= EXTRA_OCCUPANCY_LIMITS.MIN_QUANTITY &&
    quantity <= EXTRA_OCCUPANCY_LIMITS.MAX_QUANTITY
  );
};
