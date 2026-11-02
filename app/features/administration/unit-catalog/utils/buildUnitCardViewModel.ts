import { UNIT_STATUS_LABEL } from "../constants/UnitStatusLabel.constants";
import type { UnitCardViewModel } from "../models/UnitCardViewModel.interface";
import type { UnitCategory } from "../models/UnitCategory.interface";
import type { UnitListItem } from "../models/UnitListItem.interface";
import { buildUnitCardMotorTexts } from "./buildUnitCardMotorTexts";
import { resolveUnitEditPath } from "./resolveUnitPaths";

export const buildUnitCardViewModel = (
  unit: UnitListItem,
  category: UnitCategory
): UnitCardViewModel => ({
  ...buildUnitCardMotorTexts(unit, category),
  id: unit.id,
  code: unit.code,
  editHref: unit.decommissioned
    ? null
    : resolveUnitEditPath(category.id, unit.id),
  isDimmed: unit.decommissioned,
  statusLabel: UNIT_STATUS_LABEL[unit.effectiveStatus],
});
