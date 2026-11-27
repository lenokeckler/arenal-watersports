import { LENGTH } from "@/app/constants";
import type { ExtraCompatibilityCategory } from "../models/ExtraCompatibilityCategory.interface";

export const resolveInitialOpenCategoryIds = (
  categories: ExtraCompatibilityCategory[]
): string[] => {
  const linkedIds = categories
    .filter(
      (category) => category.linkedUnitCount > LENGTH.ZERO
    )
    .map((category) => category.id);

  if (linkedIds.length > LENGTH.ZERO) {
    return linkedIds;
  }

  return categories
    .slice(LENGTH.ZERO, LENGTH.ONE)
    .map((category) => category.id);
};
