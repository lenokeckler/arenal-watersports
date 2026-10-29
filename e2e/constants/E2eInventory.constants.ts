export const E2E_INVENTORY_FIXTURE = {
  ADMIN_USERNAME: "admin",
  BOAT_CATEGORY: "Lancha",
  DAMAGED_QUANTITY: 0,
  IN_REPAIR_QUANTITY: 0,
  JET_SKI_CATEGORY: "Jet Ski",
  JET_SKI_UNIT_CODE: "JET-01",
  QUANTITY_CATEGORY: "Chaleco",
  TOTAL_QUANTITY: 35,
} as const;

export const E2E_INVENTORY_SCREENSHOT = {
  OVERVIEW: "us-ope-21-01-inventory-overview",
  QUANTITY_CATEGORY: "us-ope-21-03-quantity-category",
  UNIT_CATEGORY: "us-ope-21-02-unit-category",
} as const;

export const E2E_LOCAL_SUPABASE_HOSTS = [
  "127.0.0.1",
  "localhost",
] as const;

export const E2E_AUTH_ERROR = {
  INVALID_URL:
    "The local Supabase URL is missing or invalid.",
  INVENTORY_AUTH_USER_CREATION:
    "The inventory E2E auth user could not be created.",
  LINK: "The seeded E2E administrator link could not be generated.",
  NON_LOCAL_URL:
    "E2E authentication requires local Supabase.",
  SESSION:
    "The seeded E2E administrator session could not be created.",
} as const;

export const E2E_AUTH_FLOW = {
  LINK_TYPE: "magiclink",
  OTP_TYPE: "email",
} as const;

export const E2E_SUPABASE_AUTH_OPTIONS = {
  autoRefreshToken: false,
  persistSession: false,
} as const;
