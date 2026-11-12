import {
  INVENTORY_UNIT_CONDITION_RESULT,
  type InventoryUnitConditionResult,
} from "../constants/InventoryUnitCondition.constants";

const RESULTS: readonly unknown[] = Object.values(
  INVENTORY_UNIT_CONDITION_RESULT
);

export const isInventoryUnitConditionResult = (
  value: unknown
): value is InventoryUnitConditionResult =>
  RESULTS.includes(value);
