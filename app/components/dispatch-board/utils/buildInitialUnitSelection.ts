import type { DispatchSheetGroup } from "../models/DispatchSheetGroup.interface";

export const buildInitialUnitSelection = (
  group: DispatchSheetGroup,
  preselectedUnitIds: string[]
): string[] => {
  if (!group.isTrackedByUnit) {
    return group.fixedUnitIds;
  }

  const freeUnitIds = new Set(
    group.candidateUnits.map((unit) => unit.unitId)
  );
  const target =
    group.fixedUnitIds.length + group.requiredQuantity;
  const chosen = preselectedUnitIds.filter(
    (unitId) =>
      freeUnitIds.has(unitId) &&
      !group.fixedUnitIds.includes(unitId)
  );

  return [...group.fixedUnitIds, ...chosen].slice(
    0,
    target
  );
};
