export const UNIT_HISTORY_QUERY = {
  UNIT_COLUMNS:
    "id, code, status, impact_count, usage_total, next_oil_change_at, category:equipment_categories!inner(name, usage_metric, has_condition_photos)",
  LOAD_UNIT: "load the machine of the history",
} as const;

export const UNIT_HISTORY_SEPARATOR = " · ";
