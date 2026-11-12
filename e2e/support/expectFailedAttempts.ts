import { expect } from "@playwright/test";
import { readWorkerAccountState } from "./readWorkerAccountState";

export const expectFailedAttempts = async (
  workerId: string,
  attempts: number
): Promise<void> => {
  await expect
    .poll(
      async () =>
        (await readWorkerAccountState(workerId))
          .failedAttempts
    )
    .toBe(attempts);
};
