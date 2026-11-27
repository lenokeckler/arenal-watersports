import {
  INVENTORY_UNIT_STATUS,
  type ActiveInventoryUnitStatus,
} from "@/app/constants";
import type { Database } from "@/app/types";
import { resolveRecordedUnitStatus } from "./resolveRecordedUnitStatus";

export const resolveEditedUnitStatus = (
  status: ActiveInventoryUnitStatus,
  inMaintenance: boolean
): Database["public"]["Enums"]["unit_status"] => {
  if (inMaintenance) {
    return INVENTORY_UNIT_STATUS.IN_MAINTENANCE;
  }

  return status === INVENTORY_UNIT_STATUS.IN_MAINTENANCE
    ? INVENTORY_UNIT_STATUS.AVAILABLE
    : resolveRecordedUnitStatus(status);
};
