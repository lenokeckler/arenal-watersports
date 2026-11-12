import { INVENTORY_TRACKING_MODE } from "@/app/constants";
import type { InventoryCountQuantities } from "./InventoryCountQuantities.interface";
import type { InventoryCountUnit } from "./InventoryCountUnit.interface";

export interface UnitInventoryCountCategory {
  id: string;
  name: string;
  trackingMode: typeof INVENTORY_TRACKING_MODE.BY_UNIT;
  units: InventoryCountUnit[];
}

export interface QuantityInventoryCountCategory {
  id: string;
  name: string;
  system: InventoryCountQuantities;
  trackingMode: typeof INVENTORY_TRACKING_MODE.BY_QUANTITY;
}

export type InventoryCountCategory =
  | UnitInventoryCountCategory
  | QuantityInventoryCountCategory;
