export const RESERVATION_SERVICE_OPERATION = {
  CREATE_CUSTOM_COMBO: "create custom combo reservation",
  CREATE_RENTAL: "create rental reservation",
  LOAD_CUSTOM_COMBO_PRICE: "load custom combo price",
  LOAD_GUIDES: "load reservation guides",
  MISSING_CUSTOM_COMBO_PRICE:
    "Supabase returned no custom combo price",
  MISSING_CREATED_ID:
    "Supabase returned no identifier for the created reservation",
} as const;
