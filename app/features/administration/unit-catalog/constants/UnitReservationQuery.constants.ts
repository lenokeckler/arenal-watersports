export const UNIT_RESERVATION_QUERY = {
  COLUMNS:
    "id, code, customer_name, starts_at, status, reservation_items!inner(unit_id)",
  COUNT_COLUMNS: "id, reservation_items!inner(unit_id)",
  ID_COLUMN: "id",
  OPERATION: {
    COUNT: "fetchUnitReservationCount",
    PAGE: "fetchUnitReservations",
  },
  START_COLUMN: "starts_at",
  UNIT_COLUMN: "reservation_items.unit_id",
} as const;
