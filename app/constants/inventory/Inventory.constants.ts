export const INVENTORY_TRACKING_MODE = {
  BY_QUANTITY: "by_quantity",
  BY_UNIT: "by_unit",
} as const;

export type InventoryTrackingMode =
  (typeof INVENTORY_TRACKING_MODE)[keyof typeof INVENTORY_TRACKING_MODE];

export const INVENTORY_UNIT_STATUS = {
  AVAILABLE: "available",
  DAMAGED: "damaged",
  DECOMMISSIONED: "decommissioned",
  IN_MAINTENANCE: "in_maintenance",
  IN_REPAIR: "in_repair",
  OCCUPIED: "occupied",
} as const;

export type InventoryUnitStatus =
  (typeof INVENTORY_UNIT_STATUS)[keyof typeof INVENTORY_UNIT_STATUS];

export type ActiveInventoryUnitStatus = Exclude<
  InventoryUnitStatus,
  typeof INVENTORY_UNIT_STATUS.DECOMMISSIONED
>;

export const INVENTORY_ACCESS_FUNCTION = {
  HAS_AREA: "has_area",
  IS_ADMIN: "is_admin",
} as const;

export const INVENTORY_DATA_SOURCE = {
  ALL_COLUMNS_SELECT: "*",
  CATEGORY_ID_COLUMN: "category_id",
  CATEGORY_NAME_COLUMN: "category_name",
  CATEGORY_SUMMARY_VIEW: "inventory_category_summary",
  EQUIPMENT_CATEGORIES_TABLE: "equipment_categories",
  EQUIPMENT_STOCK_TABLE: "equipment_stock",
  EQUIPMENT_UNITS_TABLE: "equipment_units",
  RECORDED_STATUS_COLUMN: "recorded_status",
  RESERVATION_DISPATCHES_TABLE: "reservation_dispatches",
  RESERVATION_ITEMS_TABLE: "reservation_items",
  UNIT_CURRENT_STATE_VIEW: "unit_current_state",
  UNIT_CODE_COLUMN: "code",
  UNIT_DETAILS_SELECT:
    "id, code, effective_status, recorded_status",
} as const;
