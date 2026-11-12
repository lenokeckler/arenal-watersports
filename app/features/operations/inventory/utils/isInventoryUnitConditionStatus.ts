import {
  INVENTORY_UNIT_CONDITION_STATUSES,
  type InventoryUnitConditionStatus,
} from "../constants/InventoryUnitCondition.constants";

const STATUSES: readonly unknown[] =
  INVENTORY_UNIT_CONDITION_STATUSES;

export const isInventoryUnitConditionStatus = (
  value: unknown
): value is InventoryUnitConditionStatus =>
  STATUSES.includes(value);
