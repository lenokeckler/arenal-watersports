import { INVENTORY_TRACKING_MODE } from "@/app/constants";
import type { InventoryCountCategory } from "../models/InventoryCountCategory.type";
import type { InventoryCountDraft } from "../models/InventoryCountDraft.interface";

export const resetCategoryToSystem = (
  draft: InventoryCountDraft,
  category: InventoryCountCategory
): InventoryCountDraft => {
  if (
    category.trackingMode !==
    INVENTORY_TRACKING_MODE.BY_UNIT
  ) {
    return draft;
  }

  const unitStatuses = { ...draft.unitStatuses };

  for (const unit of category.units) {
    unitStatuses[unit.id] = unit.status;
  }

  return { ...draft, unitStatuses };
};
