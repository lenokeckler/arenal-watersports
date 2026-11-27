import type { Extra } from "../models/Extra.interface";
import type { ExtraOccupiableCategory } from "../models/ExtraOccupiableCategory.interface";

export const includeOccupiedCategory = (
  categories: ExtraOccupiableCategory[],
  { occupiesCategoryId, occupiedCategoryName }: Extra
): ExtraOccupiableCategory[] => {
  if (
    !occupiesCategoryId ||
    !occupiedCategoryName ||
    categories.some(({ id }) => id === occupiesCategoryId)
  ) {
    return categories;
  }

  return [
    ...categories,
    { id: occupiesCategoryId, name: occupiedCategoryName },
  ];
};
