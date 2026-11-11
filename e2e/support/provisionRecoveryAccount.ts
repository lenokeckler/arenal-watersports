import { E2E_ACTIVE_WORKER } from "../constants/E2eActiveWorker.constants";
import { E2E_RECOVERY_SCENARIO } from "../constants/E2ePasswordRecovery.constants";
import { applyRecoveryScenario } from "./applyRecoveryScenario";
import { buildE2eUsername } from "./buildE2eUsername";
import { buildRecoveryAddress } from "./buildRecoveryAddress";
import type { RecoveryAccount } from "./models/RecoveryAccount.interface";
import type { RecoveryScenario } from "./models/RecoveryScenario.type";
import { provisionE2eWorker } from "./provisionE2eWorker";

export const provisionRecoveryAccount = async (
  scenario: RecoveryScenario
): Promise<RecoveryAccount> => {
  if (scenario === E2E_RECOVERY_SCENARIO.UNKNOWN) {
    return {
      address: null,
      remove: (): Promise<void> => Promise.resolve(),
      username: buildE2eUsername(),
    };
  }

  const address =
    scenario === E2E_RECOVERY_SCENARIO.NO_EMAIL
      ? null
      : buildRecoveryAddress();
  const { remove, username, workerId } =
    await provisionE2eWorker({
      mustChangePassword: false,
      password: E2E_ACTIVE_WORKER.PASSWORD,
      personalEmail: address,
    });
  await applyRecoveryScenario(workerId, scenario);

  return { address, remove, username };
};
