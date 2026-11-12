import { INVENTORY_TRACKING_MODE } from "@/app/constants";
import type { InventoryCountCategory } from "../models/InventoryCountCategory.type";
import type { InventoryCountCategoryRow } from "../models/InventoryCountCategoryRow.interface";
import type { InventoryCountUnit } from "../models/InventoryCountUnit.interface";
import { isInventoryCountUnitStatus } from "./isInventoryCountUnitStatus";

export const mapInventoryCountCategories = (
  rows: InventoryCountCategoryRow[]
): InventoryCountCategory[] =>
  rows.map((row): InventoryCountCategory => {
    if (
      row.tracking_mode === INVENTORY_TRACKING_MODE.BY_UNIT
    ) {
      const units: InventoryCountUnit[] = [];

      for (const unit of row.units) {
        if (isInventoryCountUnitStatus(unit.status)) {
          units.push({
            code: unit.code,
            id: unit.id,
            status: unit.status,
          });
        }
      }

      return {
        id: row.id,
        name: row.name,
        trackingMode: INVENTORY_TRACKING_MODE.BY_UNIT,
        units: units.sort((first, second) =>
          first.code.localeCompare(second.code)
        ),
      };
    }

    return {
      id: row.id,
      name: row.name,
      system: {
        available: row.stock?.quantity_available ?? 0,
        damaged: row.stock?.quantity_damaged ?? 0,
        inRepair: row.stock?.quantity_in_repair ?? 0,
      },
      trackingMode: INVENTORY_TRACKING_MODE.BY_QUANTITY,
    };
  });
