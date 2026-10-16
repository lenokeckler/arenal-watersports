import { setWorkerPassword } from "@/app/services/authentication";
import type { PasswordRecoveryStepOutcome } from "./models/PasswordRecoveryStepOutcome.type";

export const attemptWorkerPasswordSet = async (
  workerId: string,
  newPassword: string
): Promise<PasswordRecoveryStepOutcome> => {
  try {
    const error = await setWorkerPassword(
      workerId,
      newPassword
    );

    return error ? { failed: true } : { failed: false };
  } catch {
    return { failed: true };
  }
};
