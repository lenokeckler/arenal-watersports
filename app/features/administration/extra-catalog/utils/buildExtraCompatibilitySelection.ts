import type { ExtraCompatibilityCategory } from "../models/ExtraCompatibilityCategory.interface";
import type { ExtraCompatibilitySelection } from "../models/ExtraCompatibilitySelection.type";
import { listLinkedExtraCompatibilityUnitIds } from "./listLinkedExtraCompatibilityUnitIds";

export const buildExtraCompatibilitySelection = (
  categories: ExtraCompatibilityCategory[]
): ExtraCompatibilitySelection =>
  Object.fromEntries(
    categories.map((category) => [
      category.id,
      listLinkedExtraCompatibilityUnitIds(category.units),
    ])
  );
