import { readRecoveryAddress } from "../support/readRecoveryAddress";
import { PATHS } from "@/app/constants";
import { E2E_LOGIN_COPY } from "../constants/E2eLogin.constants";
import { E2E_ACTIVE_WORKER } from "../constants/E2eActiveWorker.constants";
import { E2E_RECOVERY_PASSWORDS } from "../constants/E2ePasswordRecoveryPin.constants";
import { E2E_PASSWORD_CHANGED_MAIL } from "../constants/E2ePasswordRecoveryReset.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { createLoginPage } from "../pages/Login.page";
import { createPasswordRecoveryRequestPage } from "../pages/PasswordRecoveryRequest.page";
import { createPasswordRecoveryResetPage } from "../pages/PasswordRecoveryReset.page";
import { expectRecoveredLogin } from "../support/expectRecoveredLogin";
import { expectRecoveryNewPasswordScreen } from "../support/expectRecoveryNewPasswordScreen";
import { expectRecoveryResetScreen } from "../support/expectRecoveryResetScreen";
import { readDeliveredRecoveryPin } from "../support/readDeliveredRecoveryPin";
import { readMailText } from "../support/readMailText";
import { recoverPassword } from "../support/recoverPassword";
import { expect, test } from "../support/recoveryTest";
import { saveRecoveryPassword } from "../support/saveRecoveryPassword";
import { signInWithCredentials } from "../support/signInWithCredentials";
import { waitForMailWithSubject } from "../support/waitForMailWithSubject";

test.describe("Password recovery reset", () => {
  test("goes from the sign-in to the new password and back to a clean sign-in with the notice", async ({
    page,
    recoveryAccount,
  }) => {
    const address = readRecoveryAddress(recoveryAccount);
    const loginPage = createLoginPage(page);
    const requestPage =
      createPasswordRecoveryRequestPage(page);
    const resetPage = createPasswordRecoveryResetPage(page);
    await loginPage.goTo();
    await loginPage.getForgotPasswordLink().click();
    await expect(page).toHaveURL(PATHS.ACCESS.RECOVERY);
    await requestPage.fillUsername(
      recoveryAccount.username
    );
    await requestPage.submit();
    await expectRecoveryResetScreen(
      page,
      recoveryAccount.username
    );
    const pin = await readDeliveredRecoveryPin(address);
    await resetPage.fillPin(pin);
    await resetPage.submit();
    await expectRecoveryNewPasswordScreen(page);

    await saveRecoveryPassword(
      page,
      E2E_RECOVERY_PASSWORDS.NEW
    );

    await expectRecoveredLogin(page);
    await expect(page).toHaveURL(PATHS.ACCESS.LOGIN, {
      timeout: E2E_TIMEOUT_MS.POST_SUBMIT,
    });
  });

  test("signs in with the new password", async ({
    page,
    recoveryAccount,
  }) => {
    await recoverPassword(page, recoveryAccount);

    await signInWithCredentials(
      page,
      recoveryAccount.username,
      E2E_RECOVERY_PASSWORDS.NEW
    );

    await expect(page).toHaveURL(PATHS.HOME);
  });

  test("refuses the old password", async ({
    page,
    recoveryAccount,
  }) => {
    await recoverPassword(page, recoveryAccount);
    const loginPage = createLoginPage(page);
    await loginPage.fillUsername(recoveryAccount.username);
    await loginPage.fillPassword(
      E2E_ACTIVE_WORKER.PASSWORD
    );

    await loginPage.submit();

    await expect(loginPage.getPasswordError()).toHaveText(
      E2E_LOGIN_COPY.INVALID_CREDENTIALS
    );
    await expect(page).not.toHaveURL(PATHS.HOME);
  });

  test("mails a notice with no PIN and no link", async ({
    page,
    recoveryAccount,
  }) => {
    const address = readRecoveryAddress(recoveryAccount);

    const pin = await recoverPassword(
      page,
      recoveryAccount
    );

    const notice = await waitForMailWithSubject(
      address,
      E2E_PASSWORD_CHANGED_MAIL.SUBJECT
    );
    const text = await readMailText(notice.ID);
    expect(text).not.toContain(pin);
    expect(text).not.toMatch(
      E2E_PASSWORD_CHANGED_MAIL.LINK_PATTERN
    );
  });
});
