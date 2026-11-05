import type { CustomComboEquipmentSelection } from "../models/CustomComboEquipmentSelection.interface";
import { RESERVATION_EQUIPMENT_COMMITMENT_TYPE } from "../constants/ReservationEquipmentCommitmentType.constants";

const isPositiveInteger = (value: number): boolean =>
  Number.isInteger(value) && value > 0;

export const hasValidCustomComboEquipmentSelections = (
  selections: CustomComboEquipmentSelection[]
): boolean => {
  if (
    Object.keys(selections).length !== selections.length
  ) {
    return false;
  }

  const categoryIds = selections.map((selection) =>
    selection.categoryId.trim()
  );
  const unitIds = selections.flatMap((selection) =>
    selection.kind ===
    RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT
      ? [selection.unitId.trim()]
      : []
  );

  return (
    categoryIds.length > 0 &&
    categoryIds.every(Boolean) &&
    new Set(categoryIds).size === categoryIds.length &&
    unitIds.every(Boolean) &&
    new Set(unitIds).size === unitIds.length &&
    selections.every(
      (selection) =>
        selection.kind ===
          RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT ||
        isPositiveInteger(selection.quantity)
    )
  );
};
