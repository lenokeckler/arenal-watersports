export const EQUIPMENT_QUERY = {
  DAMAGE_TABLE: "damage_reports",
  DAMAGE_COLUMNS:
    "id, unit_id, cause, description, impact_delta, detail_pending, reservation_id, created_at, unit:equipment_units!inner(code, category:equipment_categories!inner(has_condition_photos), status)",
  JOB_TABLE: "maintenance_records",
  JOB_COLUMNS:
    "id, unit_id, work_type, description, cost_amount, cost_currency, is_external, performed_at, created_at, unit:equipment_units!inner(code, status)",
  PENDING_COUNT_COLUMNS:
    "id, unit:equipment_units!inner(status)",
  UNIT_STATUS_COLUMN: "unit.status",
  LOAD_DAMAGE: "load the damage reports of the equipment",
  LOAD_JOBS: "load the maintenance jobs of the equipment",
  COUNT_PENDING: "count the damage reports to complete",
} as const;
