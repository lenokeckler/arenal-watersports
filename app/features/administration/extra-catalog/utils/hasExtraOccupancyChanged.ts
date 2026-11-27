import type { ExtraOccupancyColumns } from "../models/ExtraOccupancyColumns.interface";

export const hasExtraOccupancyChanged = (
  current: ExtraOccupancyColumns,
  next: ExtraOccupancyColumns
): boolean =>
  current.occupies_category_id !==
    next.occupies_category_id ||
  current.occupies_quantity !== next.occupies_quantity;
