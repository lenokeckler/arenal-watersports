import { PATHS } from "@/app/constants";
import {
  E2E_ADMIN_ACCOUNT_STATUS,
  E2E_ADMIN_ATTEMPT_LIMIT,
  E2E_UNKNOWN_USERNAME,
} from "../constants/E2eAdminRecovery.constants";
import {
  E2E_LOGIN_ACCOUNT,
  E2E_LOGIN_COPY,
  E2E_LOGIN_WRONG_PASSWORD,
} from "../constants/E2eLogin.constants";
import { createLoginPage } from "../pages/Login.page";
import { expect, test } from "../support/adminRecoveryTest";
import { expectFailedAttempts } from "../support/expectFailedAttempts";
import { readWorkerAccountState } from "../support/readWorkerAccountState";
import { setWorkerFailedAttempts } from "../support/setWorkerFailedAttempts";
import { submitLoginCredentials } from "../support/submitLoginCredentials";

test.describe("Administration account past the attempt limit", () => {
  test("reaches the limit with generic wrong-password messages and is never blocked", async ({
    page,
    seededAdmin,
  }) => {
    const loginPage = createLoginPage(page);
    await loginPage.goTo();

    for (
      let attempt = 1;
      attempt <= E2E_ADMIN_ATTEMPT_LIMIT;
      attempt += 1
    ) {
      await submitLoginCredentials(
        page,
        E2E_LOGIN_ACCOUNT.USERNAME,
        E2E_LOGIN_WRONG_PASSWORD
      );
      await expectFailedAttempts(seededAdmin.id, attempt);
      await expect(loginPage.getPasswordError()).toHaveText(
        E2E_LOGIN_COPY.INVALID_CREDENTIALS
      );
    }

    const adminMessage = await loginPage
      .getPasswordError()
      .textContent();
    await submitLoginCredentials(
      page,
      E2E_UNKNOWN_USERNAME,
      E2E_LOGIN_WRONG_PASSWORD
    );
    await expect(loginPage.getPasswordError()).toHaveText(
      adminMessage ?? ""
    );
    const state = await readWorkerAccountState(
      seededAdmin.id
    );
    expect(state.status).toBe(E2E_ADMIN_ACCOUNT_STATUS);
    expect(state.blockedReason).toBeNull();
  });

  test("refuses the right password at the limit, offers recovery and opens no session", async ({
    page,
    seededAdmin,
  }) => {
    await setWorkerFailedAttempts(
      seededAdmin.id,
      E2E_ADMIN_ATTEMPT_LIMIT
    );
    const loginPage = createLoginPage(page);
    await loginPage.goTo();

    await submitLoginCredentials(
      page,
      E2E_LOGIN_ACCOUNT.USERNAME,
      E2E_LOGIN_ACCOUNT.PASSWORD
    );

    await expect(loginPage.getFormError()).toContainText(
      E2E_LOGIN_COPY.ACCOUNT_RECOVERY_REQUIRED
    );
    await expect(
      loginPage.getRecoveryOfferLink()
    ).toHaveAttribute("href", PATHS.ACCESS.RECOVERY);
    await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
    await page.goto(PATHS.HOME);
    await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
    const state = await readWorkerAccountState(
      seededAdmin.id
    );
    expect(state.failedAttempts).toBe(
      E2E_ADMIN_ATTEMPT_LIMIT
    );
  });

  test("keeps the generic message and no offer for a wrong password at the limit", async ({
    page,
    seededAdmin,
  }) => {
    await setWorkerFailedAttempts(
      seededAdmin.id,
      E2E_ADMIN_ATTEMPT_LIMIT
    );
    const loginPage = createLoginPage(page);
    await loginPage.goTo();

    await submitLoginCredentials(
      page,
      E2E_LOGIN_ACCOUNT.USERNAME,
      E2E_LOGIN_WRONG_PASSWORD
    );

    await expect(loginPage.getPasswordError()).toHaveText(
      E2E_LOGIN_COPY.INVALID_CREDENTIALS
    );
    await expect(
      loginPage.getRecoveryOfferLink()
    ).toHaveCount(0);
  });

  test("opens the recovery request from the offer", async ({
    page,
    seededAdmin,
  }) => {
    await setWorkerFailedAttempts(
      seededAdmin.id,
      E2E_ADMIN_ATTEMPT_LIMIT
    );
    const loginPage = createLoginPage(page);
    await loginPage.goTo();
    await submitLoginCredentials(
      page,
      E2E_LOGIN_ACCOUNT.USERNAME,
      E2E_LOGIN_ACCOUNT.PASSWORD
    );

    await loginPage.getRecoveryOfferLink().click();

    await expect(page).toHaveURL(PATHS.ACCESS.RECOVERY);
  });
});
