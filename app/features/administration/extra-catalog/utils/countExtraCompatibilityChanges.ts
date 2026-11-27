import type { ExtraCompatibilitySelection } from "../models/ExtraCompatibilitySelection.type";

const countSymmetricDifference = (
  saved: readonly string[],
  selected: readonly string[]
): number =>
  selected.filter((unitId) => !saved.includes(unitId))
    .length +
  saved.filter((unitId) => !selected.includes(unitId))
    .length;

export const countExtraCompatibilityChanges = (
  saved: ExtraCompatibilitySelection,
  selected: ExtraCompatibilitySelection
): number =>
  Object.keys(selected).reduce(
    (total, categoryId) =>
      total +
      countSymmetricDifference(
        saved[categoryId] ?? [],
        selected[categoryId]
      ),
    0
  );
