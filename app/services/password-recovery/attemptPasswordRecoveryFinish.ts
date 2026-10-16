import { finishPasswordRecovery } from "./finishPasswordRecovery";

export const attemptPasswordRecoveryFinish = async (
  workerId: string
): Promise<boolean> => {
  try {
    await finishPasswordRecovery(workerId);

    return true;
  } catch {
    return false;
  }
};
