import {
  INVENTORY_UNIT_STATUS,
  type ActiveInventoryUnitStatus,
} from "@/app/constants";

export const isInactiveCategoryUnit = (
  status: ActiveInventoryUnitStatus
): boolean =>
  status === INVENTORY_UNIT_STATUS.IN_MAINTENANCE ||
  status === INVENTORY_UNIT_STATUS.IN_REPAIR;
