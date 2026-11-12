import type { InventoryCountQuantityFieldKey } from "../constants/InventoryCountHistory.constants";

export interface InventoryCountUnitDifference {
  categoryName: string;
  code: string;
  countedStatus: string;
  systemStatus: string;
}

export interface InventoryCountQuantityChange {
  counted: number;
  field: InventoryCountQuantityFieldKey;
  system: number;
}

export interface InventoryCountQuantityDifference {
  categoryName: string;
  changes: InventoryCountQuantityChange[];
}

export interface InventoryCountDifferences {
  quantityDifferences: InventoryCountQuantityDifference[];
  unitDifferences: InventoryCountUnitDifference[];
}
