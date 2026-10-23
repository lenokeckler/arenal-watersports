export const RESERVATION_SERVICE_OPERATION = {
  CREATE_CUSTOM_COMBO: "create custom combo reservation",
  CREATE_PREDEFINED_COMBO:
    "create predefined combo reservation",
  CREATE_RENTAL: "create rental reservation",
  LOAD_CUSTOM_COMBO_PRICE: "load custom combo price",
  LOAD_EXTRAS: "load reservation extras",
  LOAD_EXTRAS_PRICING: "load reservation extras pricing",
  LOAD_GUIDES: "load reservation guides",
  LOAD_PREDEFINED_COMBOS:
    "load predefined reservation combos",
  MISSING_CUSTOM_COMBO_PRICE:
    "Supabase returned no custom combo price",
  MISSING_EXTRAS_PRICING:
    "Supabase returned no reservation extras price quote",
  MISSING_CREATED_ID:
    "Supabase returned no identifier for the created reservation",
} as const;
