import { INVENTORY_TRACKING_MODE } from "@/app/constants";
import { INVENTORY_FILTER_LIMITS } from "../constants/InventoryFilters.constants";
import type { InventoryFilters } from "../models/InventoryFilters.interface";
import type { InventoryPageParameter } from "../models/InventoryPageParameter.type";

const firstValue = (
  value: InventoryPageParameter
): string =>
  (Array.isArray(value) ? value[0] : value) ?? "";

const MODES: readonly string[] = [
  INVENTORY_TRACKING_MODE.BY_UNIT,
  INVENTORY_TRACKING_MODE.BY_QUANTITY,
];

export const resolveInventoryFilters = (
  query: InventoryPageParameter,
  mode: InventoryPageParameter
): InventoryFilters => {
  const resolvedMode = firstValue(mode);

  return {
    mode: MODES.includes(resolvedMode) ? resolvedMode : "",
    query: firstValue(query)
      .trim()
      .slice(0, INVENTORY_FILTER_LIMITS.QUERY_MAX_LENGTH),
  };
};
