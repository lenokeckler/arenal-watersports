import {
  EXTRA_OCCUPANCY_LIMITS,
  EXTRA_OCCUPANCY_QUANTITY_PATTERN,
} from "../constants/ExtraOccupancyLimits.constants";

export const stepExtraOccupancyQuantity = (
  quantityText: string,
  step: number
): string => {
  const trimmed = quantityText.trim();
  const current = EXTRA_OCCUPANCY_QUANTITY_PATTERN.test(
    trimmed
  )
    ? Number(trimmed)
    : EXTRA_OCCUPANCY_LIMITS.MIN_QUANTITY - step;

  return Math.min(
    EXTRA_OCCUPANCY_LIMITS.MAX_QUANTITY,
    Math.max(
      EXTRA_OCCUPANCY_LIMITS.MIN_QUANTITY,
      current + step
    )
  ).toString();
};
