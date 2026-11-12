import type { E2E_RECOVERY_OUTCOME } from "../../constants/E2ePasswordRecoveryReset.constants";

export type RecoveryOutcome =
  (typeof E2E_RECOVERY_OUTCOME)[keyof typeof E2E_RECOVERY_OUTCOME];
