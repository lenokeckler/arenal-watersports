import { PATHS } from "@/app/constants";
import { E2E_ACTIVE_WORKER_ATTEMPTS } from "../constants/E2eActiveWorker.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import {
  E2E_BLOCKED_ACCOUNT_STATUS,
  E2E_BLOCKED_BY_ATTEMPTS_LOGIN_PATH,
  E2E_PROFILE_INVALID_PASSWORDS,
  E2E_PROFILE_NEW_PASSWORD,
} from "../constants/E2eProfile.constants";
import { createProfilePage } from "../pages/Profile.page";
import { createProfilePasswordPage } from "../pages/ProfilePassword.page";
import { expect, test } from "../support/activeWorkerTest";
import { readWorkerAccountState } from "../support/readWorkerAccountState";
import { setWorkerFailedAttempts } from "../support/setWorkerFailedAttempts";

test.describe("Profile password lock", () => {
  test("blocks the account on the last wrong current password and closes the session", async ({
    activeWorker,
    signedInPage: page,
  }) => {
    await setWorkerFailedAttempts(
      activeWorker.id,
      E2E_ACTIVE_WORKER_ATTEMPTS.JUST_BELOW_LOCK
    );
    const passwordPage = createProfilePasswordPage(page);
    await passwordPage.goTo();
    await passwordPage.fillForm({
      confirmPassword: E2E_PROFILE_NEW_PASSWORD,
      currentPassword:
        E2E_PROFILE_INVALID_PASSWORDS.CURRENT,
      newPassword: E2E_PROFILE_NEW_PASSWORD,
    });

    await passwordPage.submit();

    await expect(page).toHaveURL(
      E2E_BLOCKED_BY_ATTEMPTS_LOGIN_PATH,
      { timeout: E2E_TIMEOUT_MS.POST_SUBMIT }
    );
    await createProfilePage(page).goTo();
    await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
    const { failedAttempts, status } =
      await readWorkerAccountState(activeWorker.id);
    expect(status).toBe(E2E_BLOCKED_ACCOUNT_STATUS);
    expect(failedAttempts).toBe(
      E2E_ACTIVE_WORKER_ATTEMPTS.LOCKED
    );
  });
});
