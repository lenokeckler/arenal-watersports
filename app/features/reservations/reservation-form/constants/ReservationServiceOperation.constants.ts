export const RESERVATION_SERVICE_OPERATION = {
  CATEGORY_UNAVAILABLE:
    "Equipment category is not available for reservation",
  CREATE_RENTAL: "create rental reservation",
  EQUIPMENT_RESERVATION_ACCESS_REQUIRED:
    "Equipment reservation access is required",
  MISSING_CREATED_ID:
    "Supabase returned no identifier for the created reservation",
  RESERVATION_ACCESS_REQUIRED:
    "Reservations access is required",
  UNIT_CONFLICT:
    "Equipment unit conflicts with another reservation",
  UNIT_UNAVAILABLE:
    "Equipment unit is not available for reservation",
} as const;
