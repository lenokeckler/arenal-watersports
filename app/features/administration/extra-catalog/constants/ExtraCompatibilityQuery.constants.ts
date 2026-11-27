export const EXTRA_COMPATIBILITY_CATEGORY_COLUMNS =
  "id, name, equipment_units(id, code, status)";

export const EXTRA_COMPATIBILITY_UNITS_ORDER_OPTIONS = {
  ascending: true,
  referencedTable: "equipment_units",
} as const;
