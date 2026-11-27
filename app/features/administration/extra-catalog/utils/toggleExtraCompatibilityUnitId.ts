export const toggleExtraCompatibilityUnitId = (
  selectedUnitIds: readonly string[],
  unitId: string
): string[] =>
  selectedUnitIds.includes(unitId)
    ? selectedUnitIds.filter(
        (selectedUnitId) => selectedUnitId !== unitId
      )
    : [...selectedUnitIds, unitId];
