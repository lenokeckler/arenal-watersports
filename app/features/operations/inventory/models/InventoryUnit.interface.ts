import type { ActiveInventoryUnitStatus } from "@/app/constants";

export interface InventoryUnit {
  id: string;
  code: string;
  status: ActiveInventoryUnitStatus;
}
