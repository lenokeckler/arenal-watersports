export const INVENTORY_COUNT_HISTORY_QUERY = {
  COUNTS: "read inventory counts",
  LINES: "read inventory count lines",
} as const;

export const INVENTORY_COUNT_HISTORY_DATE_FORMAT = {
  locale: "es-CR",
  options: {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Costa_Rica",
  },
} as const satisfies {
  locale: string;
  options: Intl.DateTimeFormatOptions;
};

export const INVENTORY_COUNT_HISTORY_LIMITS = {
  PAGE_SIZE: 10,
} as const;

export const INVENTORY_COUNT_QUANTITY_FIELD_KEY = {
  AVAILABLE: "available",
  DAMAGED: "damaged",
  IN_REPAIR: "inRepair",
} as const;

export type InventoryCountQuantityFieldKey =
  (typeof INVENTORY_COUNT_QUANTITY_FIELD_KEY)[keyof typeof INVENTORY_COUNT_QUANTITY_FIELD_KEY];

export const INVENTORY_COUNT_LINES_SELECT =
  "category:equipment_categories(name), unit:equipment_units(code), confirmed_status, system_status, quantity_available, quantity_damaged, quantity_in_repair, system_quantity_available, system_quantity_damaged, system_quantity_in_repair, unit_id";
