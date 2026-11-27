export const DAMAGE_REPORT_STATE = {
  DAMAGED: "damaged",
  KEEP: "keep",
  MAINTENANCE: "in_maintenance",
} as const;

export const DAMAGE_REPORT_QUERY = {
  PENDING_COLUMNS:
    "id, unit_id, cause, description, impact_delta, reservation_id, detail_pending",
  UNIT_COLUMNS:
    "id, code, status, impact_count, category:equipment_categories!inner(name)",
  TRIP_COLUMNS:
    "unit_id, reservation_id, dispatch:reservation_dispatches!inner(dispatched_at, closed_at), reservation:reservations!inner(customer_name)",
  OPEN_COLUMNS:
    "unit_id, dispatch:reservation_dispatches!inner(closed_at)",
  TRIP_DAYS: 7,
  MILLISECONDS_PER_DAY: 86_400_000,
  RPC_CREATE: "create_damage_report",
  RPC_COMPLETE: "complete_damage_report",
} as const;

export const DAMAGE_REPORT_OPERATION = {
  LOAD: "load the damage report form",
} as const;

export const DAMAGE_REPORT_DEFAULTS = {
  HITS: 1,
} as const;

export const DAMAGE_REPORT_FAILURE = {
  FORBIDDEN: "42501",
  INVALID: "23514",
  NOT_FOUND: "P0002",
  NOT_ALLOWED: "55000",
  OUT_ON_WATER: "The unit is out on the water",
  ALREADY_COMPLETE: "The report is already complete",
} as const;

export const DAMAGE_REPORT_FIELD_ID = {
  CAUSE: "damage-report-cause",
  DESCRIPTION: "damage-report-description",
  STATE: "damage-report-state",
  TRIP: "damage-report-trip",
  UNIT: "damage-report-unit",
} as const;
