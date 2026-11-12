import type { InventoryCountUnitStatus } from "../constants/InventoryCount.constants";
import type { InventoryCountQuantities } from "./InventoryCountQuantities.interface";

export interface UnitInventoryCountLine {
  categoryId: string;
  confirmedStatus: InventoryCountUnitStatus;
  unitId: string;
}

export interface QuantityInventoryCountLine {
  categoryId: string;
  quantities: InventoryCountQuantities;
}

export type InventoryCountLine =
  UnitInventoryCountLine | QuantityInventoryCountLine;

export interface InventoryCountInput {
  lines: InventoryCountLine[];
  notes: string;
}
