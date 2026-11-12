import type { InventoryCountChangeEvent } from "./InventoryCountChangeEvent.type";
import type { InventoryCountUnit } from "./InventoryCountUnit.interface";

export interface InventoryCountUnitRowProps {
  onChange: (event: InventoryCountChangeEvent) => void;
  unit: InventoryCountUnit;
  value: string;
}
