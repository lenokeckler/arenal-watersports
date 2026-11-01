export const E2E_UNIT_CONCURRENCY = {
  CATEGORY_NAME: "E2E Fixture — Concurrencia de unidades",
  CONTAINER: "supabase_db_arenal-watersports",
  DATABASE: "postgres",
  DATABASE_USER: "postgres",
  HOLD_SECONDS: 2,
  KEY_PREFIX: "e2e-unit-concurrency",
  MINIMUM_WAIT_MILLISECONDS: 1000,
  SECOND_SESSION_DELAY_MILLISECONDS: 700,
  UNIT_CODE_PREFIX: "E2E-CONC",
} as const;

export const E2E_UNIT_CONCURRENCY_MESSAGE = {
  NOT_AVAILABLE:
    "La unidad no esta disponible para despacharse",
  OCCUPIED: "La unidad esta ocupada en un despacho abierto",
} as const;

export const E2E_UNIT_CONCURRENCY_ROLE = {
  CATEGORY: "category",
  DISPATCH: "dispatch",
  RESERVATION: "reservation",
  UNIT: "unit",
} as const;
