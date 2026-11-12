import type { Database } from "@/app/types";

export const E2E_SEEDED_ADMIN_ERROR = {
  NO_PERSONAL_EMAIL:
    "the seeded administration account has no personal email",
  OPERATION: "read the seeded administration account",
} as const;

export const E2E_ADMIN_RESTORE_ATTACHMENT = {
  CONTENT_TYPE: "text/plain",
  NAME: "seeded-admin-restore-failure",
} as const;

export const E2E_SIGN_IN_ATTEMPT_LIMIT = 10;

export const E2E_ADMIN_EXPECTED_STATUS: Database["public"]["Enums"]["worker_status"] =
  "active";

export const E2E_UNKNOWN_USERNAME = "e2e_unknown_account";

export const E2E_ADMIN_RECOVERY_SCREENSHOT_BASENAME = {
  OFFER: "01-admin-recovery-offer",
  RECOVERY_REQUEST: "03-admin-recovery-request",
  WRONG_PASSWORD_AT_LIMIT:
    "02-admin-recovery-wrong-password",
} as const;
