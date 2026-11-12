import type { InventoryPage } from "./InventoryPage.model";
import type { InventoryUnit } from "./InventoryUnit.interface";
import type { UnitTrackedInventoryCategory } from "./UnitTrackedInventoryCategory.type";

export interface InventoryUnitListSectionProps {
  category: UnitTrackedInventoryCategory;
  inventoryPage: InventoryPage<InventoryUnit>;
}
