import { E2E_ACTIVE_WORKER_ATTEMPTS } from "../constants/E2eActiveWorker.constants";
import {
  E2E_PROFILE_COPY,
  E2E_PROFILE_INVALID_PASSWORDS,
  E2E_PROFILE_NEW_PASSWORD,
} from "../constants/E2eProfile.constants";
import { createProfilePasswordPage } from "../pages/ProfilePassword.page";
import { expect, test } from "../support/activeWorkerTest";
import { readWorkerAccountState } from "../support/readWorkerAccountState";

test.describe("Profile password errors", () => {
  test("shows the rules before the worker types", async ({
    signedInPage: page,
  }) => {
    const passwordPage = createProfilePasswordPage(page);

    await passwordPage.goTo();

    await expect(
      passwordPage.getRulesTitle()
    ).toBeVisible();
  });

  test("rejects a wrong current password and counts one failed attempt", async ({
    activeWorker,
    signedInPage: page,
  }) => {
    const passwordPage = createProfilePasswordPage(page);
    await passwordPage.goTo();
    await passwordPage.fillForm({
      confirmPassword: E2E_PROFILE_NEW_PASSWORD,
      currentPassword:
        E2E_PROFILE_INVALID_PASSWORDS.CURRENT,
      newPassword: E2E_PROFILE_NEW_PASSWORD,
    });

    await passwordPage.submit();

    await expect(
      passwordPage.getCurrentPasswordError()
    ).toHaveText(E2E_PROFILE_COPY.CURRENT_PASSWORD_INVALID);
    const { failedAttempts } = await readWorkerAccountState(
      activeWorker.id
    );
    expect(failedAttempts).toBe(
      E2E_ACTIVE_WORKER_ATTEMPTS.ONE_FAILURE
    );
  });

  test("rejects a mismatched confirmation without counting an attempt", async ({
    activeWorker,
    signedInPage: page,
  }) => {
    const passwordPage = createProfilePasswordPage(page);
    await passwordPage.goTo();
    await passwordPage.fillForm({
      confirmPassword: E2E_PROFILE_INVALID_PASSWORDS.OTHER,
      currentPassword: activeWorker.password,
      newPassword: E2E_PROFILE_NEW_PASSWORD,
    });

    await passwordPage.submit();

    await expect(
      passwordPage.getConfirmPasswordError()
    ).toHaveText(E2E_PROFILE_COPY.CONFIRMATION_MISMATCH);
    const { failedAttempts } = await readWorkerAccountState(
      activeWorker.id
    );
    expect(failedAttempts).toBe(
      E2E_ACTIVE_WORKER_ATTEMPTS.NONE
    );
  });
});
