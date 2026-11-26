import {
  INVENTORY_UNIT_STATUS,
  type ActiveInventoryUnitStatus,
} from "@/app/constants";
import { isInactiveCategoryUnit } from "./isInactiveCategoryUnit";

export const hasStatusSheet = (
  status: ActiveInventoryUnitStatus
): boolean =>
  isInactiveCategoryUnit(status) ||
  status === INVENTORY_UNIT_STATUS.DAMAGED;
