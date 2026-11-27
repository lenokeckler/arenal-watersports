export const hasExtraCompatibilityChanges = (
  savedUnitIds: readonly string[],
  selectedUnitIds: readonly string[]
): boolean =>
  savedUnitIds.length !== selectedUnitIds.length ||
  selectedUnitIds.some(
    (selectedUnitId) =>
      !savedUnitIds.includes(selectedUnitId)
  );
