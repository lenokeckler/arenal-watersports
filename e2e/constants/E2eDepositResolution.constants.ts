const DEPOSIT_AMOUNT = 200;
const RETURNED_PART = 120;

export const E2E_DEPOSIT_RESOLUTION = {
  CLEANUP_OPERATION: "remove the E2E deposits to resolve",
  DAMAGE_REASON: "Aleta del paddleboard rota",
  DEPOSIT_AMOUNT,
  FIELD_SEPARATOR: "|",
  KEPT_PART: DEPOSIT_AMOUNT - RETURNED_PART,
  READ_OPERATION: "read the resolved deposit",
  RETURNED_PART,
  SCREENSHOT_BASENAME: "deposit-resolution",
  SEED_OPERATION: "seed a held deposit to resolve",
  TEST_MODE: "serial",
} as const;

export const E2E_DEPOSIT_RESOLUTION_SCREENSHOT_STATE = {
  ERROR: "error",
  FORM: "form",
  PARTIAL: "partial",
  PENDING: "pending",
  SUCCESS: "success",
  UNAVAILABLE: "unavailable",
} as const;
