import type { InventoryPage } from "./InventoryPage.model";
import type { InventoryUnit } from "./InventoryUnit.interface";
import type { QuantityTrackedInventoryCategory } from "./QuantityTrackedInventoryCategory.type";
import type { UnitTrackedInventoryCategory } from "./UnitTrackedInventoryCategory.type";

export type InventoryCategoryDetails =
  | {
      category: UnitTrackedInventoryCategory;
      units: InventoryPage<InventoryUnit>;
    }
  | { category: QuantityTrackedInventoryCategory };
