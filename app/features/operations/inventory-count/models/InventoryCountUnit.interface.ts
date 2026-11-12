import type { InventoryCountUnitStatus } from "../constants/InventoryCount.constants";

export interface InventoryCountUnit {
  code: string;
  id: string;
  status: InventoryCountUnitStatus;
}
