import { PASSWORD_RECOVERY_FINISH_ATTEMPTS } from "@/app/constants";
import { finishPasswordRecovery } from "./finishPasswordRecovery";
import type { PasswordRecoveryStepOutcome } from "./models/PasswordRecoveryStepOutcome.type";

export const attemptPasswordRecoveryFinish = async (
  workerId: string,
  attemptsLeft: number = PASSWORD_RECOVERY_FINISH_ATTEMPTS
): Promise<PasswordRecoveryStepOutcome> => {
  try {
    await finishPasswordRecovery(workerId);

    return { failed: false };
  } catch {
    return attemptsLeft > 1
      ? attemptPasswordRecoveryFinish(
          workerId,
          attemptsLeft - 1
        )
      : { failed: true };
  }
};
