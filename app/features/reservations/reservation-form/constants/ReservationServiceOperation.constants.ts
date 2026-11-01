export const RESERVATION_SERVICE_OPERATION = {
  CREATE_RENTAL: "create rental reservation",
  MISSING_CREATED_ID:
    "Supabase returned no identifier for the created reservation",
  UNIT_UNAVAILABLE:
    "Equipment unit is not available for reservation",
  UNIT_CONFLICT:
    "Equipment unit conflicts with another reservation",
  UPDATE: "update reservation",
  UPDATE_RPC: "update_reservation",
  MISSING_UPDATED_ID:
    "Supabase returned no identifier for the updated reservation",
  RESERVATION_STALE:
    "Reservation changed since the form was loaded",
} as const;
