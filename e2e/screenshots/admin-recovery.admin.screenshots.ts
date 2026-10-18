import { PATHS } from "@/app/constants";
import { E2E_ADMIN_RECOVERY_SCREENSHOT_BASENAME } from "../constants/E2eAdminRecovery.constants";
import {
  E2E_LOGIN_ACCOUNT,
  E2E_LOGIN_COPY,
  E2E_LOGIN_WRONG_PASSWORD,
} from "../constants/E2eLogin.constants";
import { createLoginPage } from "../pages/Login.page";
import { createPasswordRecoveryRequestPage } from "../pages/PasswordRecoveryRequest.page";
import { expect, test } from "../support/adminRecoveryTest";
import { captureFullPage } from "../support/captureFullPage";
import { openLoginAtAttemptLimit } from "../support/openLoginAtAttemptLimit";
import { submitLoginCredentials } from "../support/submitLoginCredentials";
import { submitRightPasswordAtLimit } from "../support/submitRightPasswordAtLimit";

test.describe("Administration recovery screenshots", () => {
  test("captures the recovery offer after the right password past the limit", async ({
    page,
    seededAdmin,
  }, testInfo) => {
    const loginPage = createLoginPage(page);

    await submitRightPasswordAtLimit(page, seededAdmin.id);
    await expect(loginPage.getFormError()).toContainText(
      E2E_LOGIN_COPY.ACCOUNT_RECOVERY_REQUIRED
    );
    await expect(
      loginPage.getRecoveryOfferLink()
    ).toBeVisible();

    await captureFullPage(
      page,
      E2E_ADMIN_RECOVERY_SCREENSHOT_BASENAME.OFFER,
      testInfo.project.name
    );
  });

  test("captures the generic message with no offer after a wrong password at the limit", async ({
    page,
    seededAdmin,
  }, testInfo) => {
    const loginPage = createLoginPage(page);
    await openLoginAtAttemptLimit(page, seededAdmin.id);

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

    await captureFullPage(
      page,
      E2E_ADMIN_RECOVERY_SCREENSHOT_BASENAME.WRONG_PASSWORD_AT_LIMIT,
      testInfo.project.name
    );
  });

  test("captures the recovery request reached from the offer", async ({
    page,
    seededAdmin,
  }, testInfo) => {
    const loginPage = createLoginPage(page);
    const requestPage =
      createPasswordRecoveryRequestPage(page);

    await submitRightPasswordAtLimit(page, seededAdmin.id);
    await loginPage.getRecoveryOfferLink().click();
    await expect(page).toHaveURL(PATHS.ACCESS.RECOVERY);
    await expect(requestPage.getHeading()).toBeVisible();

    await captureFullPage(
      page,
      E2E_ADMIN_RECOVERY_SCREENSHOT_BASENAME.RECOVERY_REQUEST,
      testInfo.project.name
    );
  });
});
