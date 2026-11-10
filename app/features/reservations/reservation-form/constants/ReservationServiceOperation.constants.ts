export const RESERVATION_SERVICE_OPERATION = {
  CATEGORY_UNAVAILABLE:
    "Equipment category is not available for reservation",
  CREATE_RENTAL: "create rental reservation",
  EQUIPMENT_RESERVATION_ACCESS_REQUIRED:
    "Equipment reservation access is required",
  LOAD_CUSTOM_COMBO_PRICE: "load custom combo price",
  LOAD_GUIDES: "load reservation guides",
  MISSING_CUSTOM_COMBO_PRICE:
    "Supabase returned no custom combo price",
  MISSING_CREATED_ID:
    "Supabase returned no identifier for the created reservation",
  QUANTITY_UNAVAILABLE:
    "Equipment category quantity is not available for reservation",
  RESERVATION_ACCESS_REQUIRED:
    "Reservations access is required",
  UNIT_CONFLICT:
    "Equipment unit conflicts with another reservation",
  UNIT_UNAVAILABLE:
    "Equipment unit is not available for reservation",
  UPDATE: "update reservation",
  UPDATE_RPC: "update_reservation",
  MISSING_UPDATED_ID:
    "Supabase returned no identifier for the updated reservation",
  RESERVATION_STALE:
    "Reservation changed since the form was loaded",
  RESERVATION_NOT_FOUND: "Reservation was not found",
  RESERVATION_NOT_SCHEDULED:
    "Only scheduled reservations can be modified",
  COMBO_EQUIPMENT_LOCKED:
    "Combo equipment cannot be changed",
  MULTIPLE_EQUIPMENT_LOCKED:
    "Reservation with several equipment items cannot change equipment",
} as const;
