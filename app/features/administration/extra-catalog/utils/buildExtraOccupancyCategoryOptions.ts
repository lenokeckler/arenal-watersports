import type { ExtraOccupancyCategoryOption } from "../models/ExtraOccupancyCategoryOption.interface";
import type { ExtraOccupiableCategory } from "../models/ExtraOccupiableCategory.interface";

export const buildExtraOccupancyCategoryOptions = (
  categories: ExtraOccupiableCategory[]
): ExtraOccupancyCategoryOption[] =>
  categories.map(({ id, name }) => ({
    key: id,
    value: id,
    label: name,
  }));
