export const RESERVATION_SERVICE_OPERATION = {
  CREATE_RENTAL: "create rental reservation",
  LOAD_GUIDES: "load reservation guides",
  MISSING_CREATED_ID:
    "Supabase returned no identifier for the created reservation",
} as const;
