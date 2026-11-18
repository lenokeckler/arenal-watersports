import { INVENTORY_UNIT_STATUS } from "@/app/constants";
import { CATEGORY_UNIT_ROW_KIND } from "../constants/CategoryUnits.constants";
import type { CategoryUnit } from "../models/CategoryUnit.interface";
import type { CategoryUnitInteraction } from "../models/CategoryUnitInteraction.interface";

interface CategoryUnitRowKindInput {
  hasSelection: boolean;
  interaction?: CategoryUnitInteraction;
  unit: CategoryUnit;
}

type CategoryUnitRowKind =
  (typeof CATEGORY_UNIT_ROW_KIND)[keyof typeof CATEGORY_UNIT_ROW_KIND];

export const resolveCategoryUnitRowKind = ({
  hasSelection,
  interaction,
  unit,
}: CategoryUnitRowKindInput): CategoryUnitRowKind => {
  if (interaction?.isEditing) {
    return unit.readings
      ? CATEGORY_UNIT_ROW_KIND.MODIFY
      : CATEGORY_UNIT_ROW_KIND.PLAIN;
  }

  if (interaction && unit.occupancy) {
    return CATEGORY_UNIT_ROW_KIND.INFO;
  }

  return hasSelection &&
    unit.status === INVENTORY_UNIT_STATUS.AVAILABLE
    ? CATEGORY_UNIT_ROW_KIND.SELECT
    : CATEGORY_UNIT_ROW_KIND.PLAIN;
};
