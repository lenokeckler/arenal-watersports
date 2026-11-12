import type { InventoryCountUnitStatus } from "../constants/InventoryCount.constants";
import type { InventoryCountUnit } from "./InventoryCountUnit.interface";

export interface InventoryCountUnitRowProps {
  onSelect: (status: InventoryCountUnitStatus) => void;
  unit: InventoryCountUnit;
  value: string;
}
