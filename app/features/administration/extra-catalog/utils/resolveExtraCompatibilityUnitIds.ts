import type { NullableRef } from "@/app/types";
import type { ExtraCompatibilityUnitIdsSources } from "../models/ExtraCompatibilityUnitIdsSources.interface";
import { excludeDecommissionedUnits } from "./excludeDecommissionedUnits";

export const resolveExtraCompatibilityUnitIds = ({
  currentLinkedIds,
  categoryUnitRows,
  selectedUnitIds,
}: ExtraCompatibilityUnitIdsSources): NullableRef<
  string[]
> => {
  const categoryUnitIds = new Set(
    categoryUnitRows.map((unitRow) => unitRow.id)
  );
  const selectableUnitIds = new Set(
    excludeDecommissionedUnits(categoryUnitRows).map(
      (unitRow) => unitRow.id
    )
  );
  if (
    !selectedUnitIds.every((unitId) =>
      selectableUnitIds.has(unitId)
    )
  ) {
    return null;
  }
  const keptOutsideCategory = currentLinkedIds.filter(
    (unitId) => !categoryUnitIds.has(unitId)
  );

  return [
    ...new Set([
      ...keptOutsideCategory,
      ...selectedUnitIds,
    ]),
  ];
};
