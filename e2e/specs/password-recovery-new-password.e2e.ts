import { PATHS } from "@/app/constants";
import {
  E2E_RECOVERY_ATTRIBUTE,
  E2E_RECOVERY_COPY,
} from "../constants/E2ePasswordRecovery.constants";
import { E2E_RECOVERY_PASSWORDS } from "../constants/E2ePasswordRecoveryPin.constants";
import { createPasswordRecoveryNewPasswordPage } from "../pages/PasswordRecoveryNewPassword.page";
import { createPasswordRecoveryResetPage } from "../pages/PasswordRecoveryReset.page";
import { expectRecoveryRequestScreen } from "../support/expectRecoveryRequestScreen";
import { recoverPassword } from "../support/recoverPassword";
import { expect, test } from "../support/recoveryTest";
import { requestAndReadRecoveryPin } from "../support/requestAndReadRecoveryPin";
import { saveRecoveryPassword } from "../support/saveRecoveryPassword";
import { submitRecoveryPin } from "../support/submitRecoveryPin";

test.describe("Password recovery new password screen", () => {
  test("sends a browser without a reset pass back to the recovery request", async ({
    page,
  }) => {
    await createPasswordRecoveryNewPasswordPage(
      page
    ).goTo();

    await expectRecoveryRequestScreen(page);
  });

  test("spends the reset pass on the first save and sends the browser back to the recovery request afterwards", async ({
    page,
    recoveryAccount,
  }) => {
    await recoverPassword(page, recoveryAccount);

    await createPasswordRecoveryNewPasswordPage(
      page
    ).goTo();

    await expectRecoveryRequestScreen(page);
  });

  test("refuses a common password and keeps the reset pass for a good one", async ({
    page,
    recoveryAccount,
  }) => {
    const newPasswordPage =
      createPasswordRecoveryNewPasswordPage(page);
    const pin = await requestAndReadRecoveryPin(
      page,
      recoveryAccount
    );
    await submitRecoveryPin(page, pin);

    await newPasswordPage.fillForm({
      confirmPassword: E2E_RECOVERY_PASSWORDS.COMMON,
      newPassword: E2E_RECOVERY_PASSWORDS.COMMON,
    });
    await newPasswordPage.submit();

    await expect(
      newPasswordPage.getNewPasswordError()
    ).toHaveText(E2E_RECOVERY_COPY.NEW_PASSWORD_COMMON);
    await expect(page).toHaveURL(
      (url) =>
        url.pathname === PATHS.ACCESS.RECOVERY_PASSWORD
    );
    await saveRecoveryPassword(
      page,
      E2E_RECOVERY_PASSWORDS.NEW
    );
  });

  test("offers another PIN from the PIN screen when it did not arrive", async ({
    page,
    recoveryAccount,
  }) => {
    const resetPage = createPasswordRecoveryResetPage(page);

    await resetPage.goTo(recoveryAccount.username);

    await expect(
      resetPage.getNotReceivedTitle()
    ).toBeVisible();
    await expect(
      resetPage.getAnotherPinLink()
    ).toHaveAttribute(
      E2E_RECOVERY_ATTRIBUTE.HREF,
      PATHS.ACCESS.RECOVERY
    );
  });
});
