import {
  INVENTORY_TRACKING_MODE,
  STRING,
} from "@/app/constants";
import { INVENTORY_COUNT_QUANTITY_FIELD } from "../constants/InventoryCount.constants";
import type { InventoryCountCategory } from "../models/InventoryCountCategory.type";
import type { InventoryCountDraft } from "../models/InventoryCountDraft.interface";

export const buildInventoryCountDraft = (
  categories: InventoryCountCategory[]
): InventoryCountDraft => {
  const draft: InventoryCountDraft = {
    notes: STRING.Empty,
    quantities: {},
    unitStatuses: {},
  };

  for (const category of categories) {
    if (
      category.trackingMode ===
      INVENTORY_TRACKING_MODE.BY_UNIT
    ) {
      for (const unit of category.units) {
        draft.unitStatuses[unit.id] = unit.status;
      }
    } else {
      draft.quantities[category.id] = {
        [INVENTORY_COUNT_QUANTITY_FIELD.AVAILABLE]: String(
          category.system.available
        ),
        [INVENTORY_COUNT_QUANTITY_FIELD.DAMAGED]: String(
          category.system.damaged
        ),
        [INVENTORY_COUNT_QUANTITY_FIELD.IN_REPAIR]: String(
          category.system.inRepair
        ),
      };
    }
  }

  return draft;
};
