export const E2E_ACCOUNT_BOUNDARY = {
  PASSWORD: "Sample.2026",
  USERNAME_PREFIX: "e2e_sin_perfil_",
} as const;

export const E2E_ACCOUNT_BOUNDARY_ERROR = {
  ACCOUNT_UNAVAILABLE: "account_unavailable",
  SIGN_UP_DISABLED: "signup_disabled",
} as const;

export const E2E_PROTECTED_CATALOG = {
  COLUMN: "id",
  ROW_LIMIT: 1,
  TABLE: "equipment_categories",
} as const;
