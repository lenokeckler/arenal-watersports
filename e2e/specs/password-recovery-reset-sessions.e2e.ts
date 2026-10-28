import { E2E_ACTIVE_WORKER } from "../constants/E2eActiveWorker.constants";
import { E2E_RECOVERY_RESET_FAILED_ATTEMPTS } from "../constants/E2ePasswordRecoveryReset.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { E2E_AUTH_ERROR_CODE } from "../constants/E2eSupabase.constants";
import { countAuthSessions } from "../support/countAuthSessions";
import { readWorkerAccountState } from "../support/readWorkerAccountState";
import { readWorkerIdByUsername } from "../support/readWorkerIdByUsername";
import { recoverPassword } from "../support/recoverPassword";
import { refreshContextSession } from "../support/refreshContextSession";
import { expect, test } from "../support/recoveryTest";
import { setWorkerFailedAttempts } from "../support/setWorkerFailedAttempts";
import { setWorkerMustChangePassword } from "../support/setWorkerMustChangePassword";
import { signInWithCredentials } from "../support/signInWithCredentials";

test.describe("Password recovery reset sessions and counters", () => {
  test("clears the failed attempts and the first sign-in flag", async ({
    page,
    recoveryAccount,
  }) => {
    const workerId = await readWorkerIdByUsername(
      recoveryAccount.username
    );
    await setWorkerFailedAttempts(
      workerId,
      E2E_RECOVERY_RESET_FAILED_ATTEMPTS
    );
    await setWorkerMustChangePassword(workerId, true);

    await recoverPassword(page, recoveryAccount);

    const state = await readWorkerAccountState(workerId);
    expect(state.failedAttempts).toBe(E2E_COUNT.NONE);
    expect(state.mustChangePassword).toBe(false);
  });

  test("closes every session of the worker and makes the other browser unable to renew its session", async ({
    browser,
    page,
    recoveryAccount,
  }) => {
    const workerId = await readWorkerIdByUsername(
      recoveryAccount.username
    );
    const otherContext = await browser.newContext();
    try {
      const otherPage = await otherContext.newPage();
      await signInWithCredentials(
        otherPage,
        recoveryAccount.username,
        E2E_ACTIVE_WORKER.PASSWORD
      );
      expect(
        await countAuthSessions(workerId)
      ).toBeGreaterThan(E2E_COUNT.NONE);

      await recoverPassword(page, recoveryAccount);

      expect(await countAuthSessions(workerId)).toBe(
        E2E_COUNT.NONE
      );
      const refreshError =
        await refreshContextSession(otherContext);
      expect(refreshError?.code).toBe(
        E2E_AUTH_ERROR_CODE.SESSION_GONE
      );
    } finally {
      await otherContext.close();
    }
  });
});
