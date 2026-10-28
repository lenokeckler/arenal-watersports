import { expect, test } from "../support/recoveryTest";
import { E2E_RECOVERY_COPY } from "../constants/E2ePasswordRecovery.constants";
import { E2E_RECOVERY_SCREENSHOT_BASENAME } from "../constants/E2ePasswordRecoveryPin.constants";
import { createLoginPage } from "../pages/Login.page";
import { createPasswordRecoveryNewPasswordPage } from "../pages/PasswordRecoveryNewPassword.page";
import { createPasswordRecoveryRequestPage } from "../pages/PasswordRecoveryRequest.page";
import { createPasswordRecoveryResetPage } from "../pages/PasswordRecoveryReset.page";
import { buildWrongPin } from "../support/buildWrongPin";
import { captureFullPage } from "../support/captureFullPage";
import { requestAndReadRecoveryPin } from "../support/requestAndReadRecoveryPin";
import { submitRecoveryPin } from "../support/submitRecoveryPin";
import { waitForNetworkIdle } from "../support/waitForNetworkIdle";

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

  test("captures the PIN screen right after the request with the empty boxes", async ({
    page,
    recoveryAccount,
  }, testInfo) => {
    const resetPage = createPasswordRecoveryResetPage(page);

    await requestAndReadRecoveryPin(page, recoveryAccount);
    await expect(resetPage.getPinInput()).toBeVisible();
    await waitForNetworkIdle(page);

    await captureFullPage(
      page,
      E2E_RECOVERY_SCREENSHOT_BASENAME.PIN_SCREEN,
      testInfo.project.name
    );
  });

  test("captures the PIN screen with the generic PIN error", async ({
    page,
    recoveryAccount,
  }, testInfo) => {
    const resetPage = createPasswordRecoveryResetPage(page);
    const pin = await requestAndReadRecoveryPin(
      page,
      recoveryAccount
    );
    await resetPage.fillPin(buildWrongPin(pin));

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

  test("captures the new password screen before typing with the rules visible", async ({
    page,
    recoveryAccount,
  }, testInfo) => {
    const newPasswordPage =
      createPasswordRecoveryNewPasswordPage(page);
    const pin = await requestAndReadRecoveryPin(
      page,
      recoveryAccount
    );

    await submitRecoveryPin(page, pin);
    await expect(
      newPasswordPage.getRulesTitle()
    ).toBeVisible();
    await waitForNetworkIdle(page);

    await captureFullPage(
      page,
      E2E_RECOVERY_SCREENSHOT_BASENAME.NEW_PASSWORD_SCREEN,
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
