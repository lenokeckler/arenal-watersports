import {
  INVENTORY_COUNT_RESULT,
  type InventoryCountResult,
} from "../constants/InventoryCount.constants";

const RESULTS: readonly unknown[] = Object.values(
  INVENTORY_COUNT_RESULT
);

export const isInventoryCountResult = (
  value: unknown
): value is InventoryCountResult => RESULTS.includes(value);
