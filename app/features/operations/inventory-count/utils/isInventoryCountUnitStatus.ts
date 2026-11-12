import {
  INVENTORY_COUNT_UNIT_STATUSES,
  type InventoryCountUnitStatus,
} from "../constants/InventoryCount.constants";

const STATUSES: readonly unknown[] =
  INVENTORY_COUNT_UNIT_STATUSES;

export const isInventoryCountUnitStatus = (
  value: unknown
): value is InventoryCountUnitStatus =>
  STATUSES.includes(value);
