export const BOARD_CATEGORY_UNITS_QUERY = {
  CATEGORY_COLUMN: "category_id",
  STATUS_COLUMN: "effective_status",
  ORDER_BY_CODE: "unit_code",
  ORDER_BY_ID: "unit_id",
  PROJECTION:
    "unit_id,unit_code,category_id,effective_status,returns_at,reservation_id,reservation_code,customer_name,reservation_starts_at,reservation_ends_at,fuel_level,fuel_max,usage_total,has_motor,consumes_fuel,usage_metric,impact_count,low_fuel_lines,people_count,dispatch_id,dispatched_at,radio_channel,oil_remaining,oil_warning",
  VIEW: "board_category_units",
} as const;

export const BOARD_CATEGORY_UNITS_OPERATION =
  "read board category units";
