import { test as base } from "@playwright/test";
import { E2E_RECOVERY_SCENARIO } from "../constants/E2ePasswordRecovery.constants";
import type { RecoveryTestFixtures } from "./models/RecoveryTestFixtures.interface";
import { provisionRecoveryAccount } from "./provisionRecoveryAccount";
import { resetPasswordRecoveryRequests } from "./resetPasswordRecoveryRequests";

export const test = base.extend<RecoveryTestFixtures>({
  recoveryAccount: [
    async ({ recoveryScenario }, provide) => {
      await resetPasswordRecoveryRequests();
      const account = await provisionRecoveryAccount(
        recoveryScenario
      );

      await provide(account);
      await account.remove();
    },
    { auto: true },
  ],
  recoveryScenario: [
    E2E_RECOVERY_SCENARIO.ELIGIBLE,
    { option: true },
  ],
});

export { expect } from "@playwright/test";
