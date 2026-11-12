import { INVENTORY_TRACKING_MODE } from "@/app/constants";
import { INVENTORY_COUNT_QUANTITY_FIELD } from "../constants/InventoryCount.constants";
import type { InventoryCountCategory } from "../models/InventoryCountCategory.type";
import type { InventoryCountDraft } from "../models/InventoryCountDraft.interface";
import type {
  InventoryCountInput,
  InventoryCountLine,
} from "../models/InventoryCountInput.interface";
import { isInventoryCountUnitStatus } from "./isInventoryCountUnitStatus";
import { parseInventoryCountQuantity } from "./parseInventoryCountQuantity";

interface InventoryCountBuild {
  input: InventoryCountInput | null;
  invalidCategoryIds: Set<string>;
}

export const buildInventoryCountInput = (
  categories: InventoryCountCategory[],
  draft: InventoryCountDraft
): InventoryCountBuild => {
  const lines: InventoryCountLine[] = [];
  const invalidCategoryIds = new Set<string>();

  for (const category of categories) {
    if (
      category.trackingMode ===
      INVENTORY_TRACKING_MODE.BY_UNIT
    ) {
      for (const unit of category.units) {
        const confirmedStatus = draft.unitStatuses[unit.id];

        if (isInventoryCountUnitStatus(confirmedStatus)) {
          lines.push({
            categoryId: category.id,
            confirmedStatus,
            unitId: unit.id,
          });
        } else {
          invalidCategoryIds.add(category.id);
        }
      }
    } else {
      const fields = draft.quantities[category.id];
      const available = parseInventoryCountQuantity(
        fields?.[
          INVENTORY_COUNT_QUANTITY_FIELD.AVAILABLE
        ] ?? ""
      );
      const damaged = parseInventoryCountQuantity(
        fields?.[INVENTORY_COUNT_QUANTITY_FIELD.DAMAGED] ??
          ""
      );
      const inRepair = parseInventoryCountQuantity(
        fields?.[
          INVENTORY_COUNT_QUANTITY_FIELD.IN_REPAIR
        ] ?? ""
      );

      if (
        available === null ||
        damaged === null ||
        inRepair === null
      ) {
        invalidCategoryIds.add(category.id);
      } else {
        lines.push({
          categoryId: category.id,
          quantities: { available, damaged, inRepair },
        });
      }
    }
  }

  return {
    input:
      invalidCategoryIds.size === 0 && lines.length > 0
        ? { lines, notes: draft.notes }
        : null,
    invalidCategoryIds,
  };
};
