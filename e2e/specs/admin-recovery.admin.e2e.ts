import { PATHS } from "@/app/constants";
import { E2E_RECOVERY_PASSWORDS } from "../constants/E2ePasswordRecoveryPin.constants";
import { E2E_RECOVERY_RESET_FAILED_ATTEMPTS } from "../constants/E2ePasswordRecoveryReset.constants";
import { E2E_LOGIN_ACCOUNT } from "../constants/E2eLogin.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { expect, test } from "../support/adminRecoveryTest";
import { expectSingleMailTo } from "../support/expectSingleMailTo";
import { readRecoveryPin } from "../support/readRecoveryPin";
import { readWorkerAccountState } from "../support/readWorkerAccountState";
import { requestRecoveryFromLogin } from "../support/requestRecoveryFromLogin";
import { resetPasswordWithPin } from "../support/resetPasswordWithPin";
import { setWorkerFailedAttempts } from "../support/setWorkerFailedAttempts";
import { signInWithCredentials } from "../support/signInWithCredentials";

test.describe("Administration account recovery", () => {
  test("recovers the administration password with a PIN mailed to its personal email and resets the attempts counter", async ({
    page,
    seededAdmin,
  }) => {
    await setWorkerFailedAttempts(
      seededAdmin.id,
      E2E_RECOVERY_RESET_FAILED_ATTEMPTS
    );
    await requestRecoveryFromLogin(
      page,
      E2E_LOGIN_ACCOUNT.USERNAME
    );
    await expectSingleMailTo(seededAdmin.personalEmail);
    const pin = await readRecoveryPin(
      seededAdmin.personalEmail
    );

    await resetPasswordWithPin(
      page,
      pin,
      E2E_RECOVERY_PASSWORDS.NEW
    );

    await signInWithCredentials(
      page,
      E2E_LOGIN_ACCOUNT.USERNAME,
      E2E_RECOVERY_PASSWORDS.NEW
    );
    await expect(page).toHaveURL(PATHS.HOME);
    const state = await readWorkerAccountState(
      seededAdmin.id
    );
    expect(state.failedAttempts).toBe(E2E_COUNT.NONE);
  });
});
