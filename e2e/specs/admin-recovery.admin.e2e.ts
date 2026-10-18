import { PATHS } from "@/app/constants";
import { E2E_RECOVERY_MAIL_COUNT } from "../constants/E2ePasswordRecovery.constants";
import { E2E_RECOVERY_PASSWORDS } from "../constants/E2ePasswordRecoveryPin.constants";
import { E2E_RECOVERY_RESET_FAILED_ATTEMPTS } from "../constants/E2ePasswordRecoveryReset.constants";
import { E2E_LOGIN_ACCOUNT } from "../constants/E2eLogin.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { createLoginPage } from "../pages/Login.page";
import { createPasswordRecoveryRequestPage } from "../pages/PasswordRecoveryRequest.page";
import { createPasswordRecoveryResetPage } from "../pages/PasswordRecoveryReset.page";
import { expect, test } from "../support/adminRecoveryTest";
import { expectRecoveredLogin } from "../support/expectRecoveredLogin";
import { expectRecoveryResetScreen } from "../support/expectRecoveryResetScreen";
import { readRecoveryPin } from "../support/readRecoveryPin";
import { readWorkerAccountState } from "../support/readWorkerAccountState";
import { setWorkerFailedAttempts } from "../support/setWorkerFailedAttempts";
import { signInWithCredentials } from "../support/signInWithCredentials";
import { waitForDeliveredMail } from "../support/waitForDeliveredMail";

test.describe("Administration account recovery", () => {
  test("recovers the administration password with a PIN mailed to its personal email and resets the attempts counter", async ({
    page,
    seededAdmin,
  }) => {
    await setWorkerFailedAttempts(
      seededAdmin.id,
      E2E_RECOVERY_RESET_FAILED_ATTEMPTS
    );
    const loginPage = createLoginPage(page);
    const requestPage =
      createPasswordRecoveryRequestPage(page);
    const resetPage = createPasswordRecoveryResetPage(page);
    await loginPage.goTo();
    await loginPage.getForgotPasswordLink().click();
    await expect(page).toHaveURL(PATHS.ACCESS.RECOVERY);
    await requestPage.fillUsername(
      E2E_LOGIN_ACCOUNT.USERNAME
    );
    await requestPage.submit();
    await expectRecoveryResetScreen(
      page,
      E2E_LOGIN_ACCOUNT.USERNAME
    );

    const messages = await waitForDeliveredMail(
      seededAdmin.personalEmail
    );
    expect(messages).toHaveLength(
      E2E_RECOVERY_MAIL_COUNT.ONE
    );
    expect(
      messages[0].To.map(({ Address }) => Address)
    ).toEqual([seededAdmin.personalEmail]);
    const pin = await readRecoveryPin(
      seededAdmin.personalEmail
    );
    await resetPage.fillForm({
      confirmPassword: E2E_RECOVERY_PASSWORDS.NEW,
      newPassword: E2E_RECOVERY_PASSWORDS.NEW,
      pin,
    });
    await resetPage.submit();

    await expectRecoveredLogin(page);
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
