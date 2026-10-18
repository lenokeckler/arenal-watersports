import { expect, test } from "../support/recoveryTest";
import { E2E_RECOVERY_COPY } from "../constants/E2ePasswordRecovery.constants";
import {
  E2E_RECOVERY_PASSWORDS,
  E2E_RECOVERY_SCREENSHOT_BASENAME,
} from "../constants/E2ePasswordRecoveryPin.constants";
import { createLoginPage } from "../pages/Login.page";
import { createPasswordRecoveryRequestPage } from "../pages/PasswordRecoveryRequest.page";
import { createPasswordRecoveryResetPage } from "../pages/PasswordRecoveryReset.page";
import { buildWrongPin } from "../support/buildWrongPin";
import { captureFullPage } from "../support/captureFullPage";
import { requestAndReadRecoveryPin } from "../support/requestAndReadRecoveryPin";

test.describe("Password recovery screenshots", () => {
  test("captures the request screen empty", async ({
    page,
  }, testInfo) => {
    const requestPage =
      createPasswordRecoveryRequestPage(page);

    await requestPage.goTo();
    await expect(requestPage.getHeading()).toBeVisible();

    await captureFullPage(
      page,
      E2E_RECOVERY_SCREENSHOT_BASENAME.REQUEST_EMPTY,
      testInfo.project.name
    );
  });

  test("captures the request screen with the field error", async ({
    page,
  }, testInfo) => {
    const requestPage =
      createPasswordRecoveryRequestPage(page);
    await requestPage.goTo();

    await requestPage.submit();
    await expect(requestPage.getUsernameError()).toHaveText(
      E2E_RECOVERY_COPY.USERNAME_REQUIRED
    );

    await captureFullPage(
      page,
      E2E_RECOVERY_SCREENSHOT_BASENAME.REQUEST_FIELD_ERROR,
      testInfo.project.name
    );
  });

  test("captures the PIN screen right after the request with the rules visible", async ({
    page,
    recoveryAccount,
  }, testInfo) => {
    const resetPage = createPasswordRecoveryResetPage(page);

    await requestAndReadRecoveryPin(page, recoveryAccount);
    await expect(resetPage.getRulesTitle()).toBeVisible();

    await captureFullPage(
      page,
      E2E_RECOVERY_SCREENSHOT_BASENAME.PIN_SCREEN,
      testInfo.project.name
    );
  });

  test("captures the PIN screen with the generic PIN error and the passwords revealed", async ({
    page,
    recoveryAccount,
  }, testInfo) => {
    const resetPage = createPasswordRecoveryResetPage(page);
    const pin = await requestAndReadRecoveryPin(
      page,
      recoveryAccount
    );
    await resetPage.fillForm({
      confirmPassword: E2E_RECOVERY_PASSWORDS.NEW,
      newPassword: E2E_RECOVERY_PASSWORDS.NEW,
      pin: buildWrongPin(pin),
    });
    await resetPage.revealPasswords();

    await resetPage.submit();
    await expect(resetPage.getPinError()).toHaveText(
      E2E_RECOVERY_COPY.PIN_INVALID
    );

    await captureFullPage(
      page,
      E2E_RECOVERY_SCREENSHOT_BASENAME.PIN_SCREEN_PIN_ERROR,
      testInfo.project.name
    );
  });

  test("captures the login with the forgot password link", async ({
    page,
  }, testInfo) => {
    const loginPage = createLoginPage(page);

    await loginPage.goTo();
    await expect(
      loginPage.getForgotPasswordLink()
    ).toBeVisible();

    await captureFullPage(
      page,
      E2E_RECOVERY_SCREENSHOT_BASENAME.LOGIN_WITH_LINK,
      testInfo.project.name
    );
  });

  test("captures the login with the password changed notice", async ({
    page,
  }, testInfo) => {
    const loginPage = createLoginPage(page);

    await loginPage.goToPasswordRecovered();
    await expect(
      loginPage.getPasswordRecoveredNotice()
    ).toBeVisible();

    await captureFullPage(
      page,
      E2E_RECOVERY_SCREENSHOT_BASENAME.LOGIN_RECOVERED_NOTICE,
      testInfo.project.name
    );
  });
});
