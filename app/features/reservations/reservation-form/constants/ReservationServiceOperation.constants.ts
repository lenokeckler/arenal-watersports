export const RESERVATION_SERVICE_OPERATION = {
  CREATE_RENTAL: "create rental reservation",
  MISSING_CREATED_ID:
    "Supabase returned no identifier for the created reservation",
  UNIT_UNAVAILABLE:
    "Equipment unit is not available for reservation",
  UNIT_CONFLICT:
    "Equipment unit conflicts with another reservation",
} as const;
