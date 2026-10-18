import { PATHS } from "@/app/constants";
import {
  E2E_ADMIN_EXPECTED_STATUS,
  E2E_SIGN_IN_ATTEMPT_LIMIT,
} from "../constants/E2eAdminRecovery.constants";
import { E2E_RECOVERY_PASSWORDS } from "../constants/E2ePasswordRecoveryPin.constants";
import {
  E2E_LOGIN_ACCOUNT,
  E2E_LOGIN_COPY,
} from "../constants/E2eLogin.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { createLoginPage } from "../pages/Login.page";
import { expect, test } from "../support/adminRecoveryTest";
import { expectFailedAttempts } from "../support/expectFailedAttempts";
import { recoverAdminFromOffer } from "../support/recoverAdminFromOffer";
import { readWorkerAccountState } from "../support/readWorkerAccountState";
import { signInWithCredentials } from "../support/signInWithCredentials";
import { submitLoginCredentials } from "../support/submitLoginCredentials";
import { submitRightPasswordAtLimit } from "../support/submitRightPasswordAtLimit";

test.describe("Recovery lifts the administration gate", () => {
  test("recovers from the offer past the limit, resets the counter and keeps the account active", async ({
    page,
    seededAdmin,
  }) => {
    const loginPage = createLoginPage(page);
    await submitRightPasswordAtLimit(page, seededAdmin.id);
    await expect(loginPage.getFormError()).toContainText(
      E2E_LOGIN_COPY.ACCOUNT_RECOVERY_REQUIRED
    );
    await expectFailedAttempts(
      seededAdmin.id,
      E2E_SIGN_IN_ATTEMPT_LIMIT
    );

    await recoverAdminFromOffer(
      page,
      seededAdmin,
      E2E_RECOVERY_PASSWORDS.NEW
    );

    await expect(
      loginPage.getPasswordRecoveredNotice()
    ).toBeVisible();
    await expectFailedAttempts(
      seededAdmin.id,
      E2E_COUNT.NONE
    );
    const state = await readWorkerAccountState(
      seededAdmin.id
    );
    expect(state.status).toBe(E2E_ADMIN_EXPECTED_STATUS);
  });

  test("signs in with the new password once recovered", async ({
    page,
    seededAdmin,
  }) => {
    await recoverAdminFromOffer(
      page,
      seededAdmin,
      E2E_RECOVERY_PASSWORDS.NEW
    );

    await signInWithCredentials(
      page,
      E2E_LOGIN_ACCOUNT.USERNAME,
      E2E_RECOVERY_PASSWORDS.NEW
    );

    await expect(page).toHaveURL(PATHS.HOME);
  });

  test("refuses the old password with the generic message once recovered", async ({
    page,
    seededAdmin,
  }) => {
    const loginPage = createLoginPage(page);
    await recoverAdminFromOffer(
      page,
      seededAdmin,
      E2E_RECOVERY_PASSWORDS.NEW
    );

    await loginPage.goTo();
    await submitLoginCredentials(
      page,
      E2E_LOGIN_ACCOUNT.USERNAME,
      E2E_LOGIN_ACCOUNT.PASSWORD
    );

    await expect(loginPage.getPasswordError()).toHaveText(
      E2E_LOGIN_COPY.INVALID_CREDENTIALS
    );
    await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
  });
});
