import type { ActiveInventoryUnitStatus } from "@/app/constants";

export interface InventoryUnitConditionControlProps {
  status: ActiveInventoryUnitStatus;
  unitId: string;
}
