export const BOARD_CATEGORY_UNITS_QUERY = {
  CATEGORY_COLUMN: "category_id",
  ORDER_BY_CODE: "unit_code",
  ORDER_BY_ID: "unit_id",
  PROJECTION:
    "unit_id,unit_code,category_id,effective_status,returns_at,reservation_id,reservation_code,customer_name,reservation_starts_at,reservation_ends_at",
  VIEW: "board_category_units",
} as const;

export const BOARD_CATEGORY_UNITS_OPERATION =
  "read board category units";
