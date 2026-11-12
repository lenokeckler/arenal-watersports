import { INVENTORY_UNIT_STATUS } from "@/app/constants";

export const INVENTORY_COUNT_UNIT_STATUSES = [
  INVENTORY_UNIT_STATUS.AVAILABLE,
  INVENTORY_UNIT_STATUS.DAMAGED,
  INVENTORY_UNIT_STATUS.IN_REPAIR,
  INVENTORY_UNIT_STATUS.IN_MAINTENANCE,
] as const;

export type InventoryCountUnitStatus =
  (typeof INVENTORY_COUNT_UNIT_STATUSES)[number];

export const INVENTORY_COUNT_RESULT = {
  FAILED: "failed",
  INCOMPLETE: "incomplete",
  INVALID: "invalid",
  NOT_ALLOWED: "not_allowed",
  RECORDED: "recorded",
} as const;

export type InventoryCountResult =
  (typeof INVENTORY_COUNT_RESULT)[keyof typeof INVENTORY_COUNT_RESULT];

export const INVENTORY_COUNT_QUERY = {
  CATEGORIES: "read inventory count categories",
} as const;

export const INVENTORY_COUNT_LIMITS = {
  NOTES_MAX_LENGTH: 1000,
  QUANTITY_MAX_DIGITS: 6,
} as const;

export const INVENTORY_COUNT_QUANTITY_FIELD = {
  AVAILABLE: "available",
  DAMAGED: "damaged",
  IN_REPAIR: "inRepair",
} as const;

export type InventoryCountQuantityField =
  (typeof INVENTORY_COUNT_QUANTITY_FIELD)[keyof typeof INVENTORY_COUNT_QUANTITY_FIELD];

export const INVENTORY_COUNT_FIELD_ID = {
  NOTES: "inventory-count-notes",
  QUANTITY: (
    categoryId: string,
    field: InventoryCountQuantityField
  ) => `inventory-count-${categoryId}-${field}`,
  UNIT: (unitId: string) =>
    `inventory-count-unit-${unitId}`,
} as const;
