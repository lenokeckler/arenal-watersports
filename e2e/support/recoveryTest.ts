import { test as base } from "@playwright/test";
import { E2E_RECOVERY_SCENARIO } from "../constants/E2ePasswordRecovery.constants";
import { clearMailbox } from "./clearMailbox";
import type { RecoveryAccount } from "./models/RecoveryAccount.interface";
import type { RecoveryScenario } from "./models/RecoveryScenario.type";
import { provisionRecoveryAccount } from "./provisionRecoveryAccount";
import { resetPasswordRecoveryRecords } from "./resetPasswordRecoveryRecords";

export const test = base.extend<{
  recoveryAccount: RecoveryAccount;
  recoveryScenario: RecoveryScenario;
}>({
  recoveryAccount: [
    async ({ recoveryScenario }, provide) => {
      await resetPasswordRecoveryRecords();
      await clearMailbox();
      const account = await provisionRecoveryAccount(
        recoveryScenario
      );

      await provide(account);
      await account.remove();
      await resetPasswordRecoveryRecords();
    },
    { auto: true },
  ],
  recoveryScenario: [
    E2E_RECOVERY_SCENARIO.ELIGIBLE,
    { option: true },
  ],
});

export { expect } from "@playwright/test";
