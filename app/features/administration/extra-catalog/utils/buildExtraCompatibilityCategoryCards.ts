import type { ExtraCompatibilityCategory } from "../models/ExtraCompatibilityCategory.interface";
import type { ExtraCompatibilityCategoryCard } from "../models/ExtraCompatibilityCategoryCard.interface";
import { buildExtraCompatibilityProgressLabel } from "./buildExtraCompatibilityProgressLabel";
import { resolveExtraCompatibilityCategoryPath } from "./resolveExtraCompatibilityCategoryPath";

export const buildExtraCompatibilityCategoryCards = (
  extraId: string,
  categories: ExtraCompatibilityCategory[]
): ExtraCompatibilityCategoryCard[] =>
  categories.map((category) => ({
    href: resolveExtraCompatibilityCategoryPath(
      extraId,
      category.id
    ),
    id: category.id,
    name: category.name,
    progressLabel: buildExtraCompatibilityProgressLabel(
      category.linkedUnitCount,
      category.unitCount
    ),
  }));
