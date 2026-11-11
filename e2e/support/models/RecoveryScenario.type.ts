import type { E2E_RECOVERY_SCENARIO } from "../../constants/E2ePasswordRecovery.constants";

export type RecoveryScenario =
  (typeof E2E_RECOVERY_SCENARIO)[keyof typeof E2E_RECOVERY_SCENARIO];
