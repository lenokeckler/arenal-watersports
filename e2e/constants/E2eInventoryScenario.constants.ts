import { INVENTORY_UNIT_STATUS } from "@/app/constants";

export const E2E_INVENTORY_SCENARIO = {
  ADMIN_ID: "00000000-0000-0000-0000-000000000001",
  BOAT_CODES: ["BENNINGTON", "PONTOON"],
  CATEGORY_NAME_PREFIX: "E2E inventory",
  ID_COLUMN: "id",
  INVALID_CATEGORY: "invalid-category",
  MISSING_CATEGORY: "ffffffff-ffff-ffff-ffff-ffffffffffff",
  MISSING_UNIT_INSERT_RESULT:
    "The inventory unit fixture insert returned incomplete data.",
  OUT_OF_RANGE_PAGE: 999,
  STOCK: {
    quantity_available: 7,
    quantity_damaged: 3,
    quantity_in_repair: 2,
  },
  STOCK_UPDATED: {
    quantity_available: 5,
    quantity_damaged: 4,
    quantity_in_repair: 3,
  },
  UNIT_CODE_PREFIX: "E2E-",
} as const;

export const E2E_INVENTORY_ACTIVE_DISPATCH = {
  CUSTOMER_NAME_PREFIX: "E2E inventory active dispatch",
  DURATION_MINUTES: 60,
  MISSING_AVAILABLE_UNIT:
    "The occupied inventory fixture has no available unit.",
  MISSING_RESERVATION_ITEM:
    "The occupied inventory fixture reservation item was not returned.",
  PEOPLE_COUNT: 1,
  RESERVATION_ID_COLUMN: "reservation_id",
  RESERVATION_TYPE: "rental",
} as const;

export const E2E_INVENTORY_UNIT_SEED_SELECT = "id, code";

export const E2E_INVENTORY_UNIT_STATES = [
  INVENTORY_UNIT_STATUS.AVAILABLE,
  INVENTORY_UNIT_STATUS.DAMAGED,
  INVENTORY_UNIT_STATUS.IN_MAINTENANCE,
  INVENTORY_UNIT_STATUS.IN_REPAIR,
] as const;
