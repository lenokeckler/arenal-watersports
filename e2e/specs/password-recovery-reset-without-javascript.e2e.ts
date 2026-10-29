import { readRecoveryAddress } from "../support/readRecoveryAddress";
import {
  API,
  LOGIN_NOTICE_QUERY_PARAM,
} from "@/app/constants";
import {
  E2E_RECOVERY_ALLOWED_PARAMS,
  E2E_RECOVERY_SECRET_PARAMS,
} from "../constants/E2ePasswordRecoveryReset.constants";
import { E2E_RECOVERY_PASSWORDS } from "../constants/E2ePasswordRecoveryPin.constants";
import { createPasswordRecoveryNewPasswordPage } from "../pages/PasswordRecoveryNewPassword.page";
import { createPasswordRecoveryRequestPage } from "../pages/PasswordRecoveryRequest.page";
import { createPasswordRecoveryResetPage } from "../pages/PasswordRecoveryReset.page";
import { expectRecoveredLogin } from "../support/expectRecoveredLogin";
import { expectRecoveryNewPasswordScreen } from "../support/expectRecoveryNewPasswordScreen";
import { expectRecoveryResetScreen } from "../support/expectRecoveryResetScreen";
import { readDeliveredRecoveryPin } from "../support/readDeliveredRecoveryPin";
import { expect, test } from "../support/recoveryTest";
import { requestRecoveryPin } from "../support/requestRecoveryPin";
import { trackNavigationUrls } from "../support/trackNavigationUrls";
import { waitForPostNavigation } from "../support/waitForPostNavigation";

test.describe("Password recovery without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("posts the request form and lands on the PIN screen", async ({
    page,
    recoveryAccount,
  }) => {
    const requestPage =
      createPasswordRecoveryRequestPage(page);
    await requestPage.goTo();
    await requestPage.fillUsername(
      recoveryAccount.username
    );
    const submission = waitForPostNavigation(page);

    await requestPage.submit();

    expect((await submission).method()).toBe(
      API.METHODS.POST
    );
    await expectRecoveryResetScreen(
      page,
      recoveryAccount.username
    );
  });

  test("posts the PIN form and the new password form and lands on the sign-in with the notice", async ({
    page,
    recoveryAccount,
  }) => {
    const resetPage = createPasswordRecoveryResetPage(page);
    const newPasswordPage =
      createPasswordRecoveryNewPasswordPage(page);
    const tracker = trackNavigationUrls(page);
    await requestRecoveryPin(
      page,
      recoveryAccount.username
    );
    await expectRecoveryResetScreen(
      page,
      recoveryAccount.username
    );
    const pin = await readDeliveredRecoveryPin(
      readRecoveryAddress(recoveryAccount)
    );
    await resetPage.fillPin(pin);
    const pinSubmission = waitForPostNavigation(page);

    await resetPage.submit();

    expect((await pinSubmission).method()).toBe(
      API.METHODS.POST
    );
    await expectRecoveryNewPasswordScreen(page);
    await newPasswordPage.fillForm({
      confirmPassword: E2E_RECOVERY_PASSWORDS.NEW,
      newPassword: E2E_RECOVERY_PASSWORDS.NEW,
    });
    const passwordSubmission = waitForPostNavigation(page);

    await newPasswordPage.submit();

    expect((await passwordSubmission).method()).toBe(
      API.METHODS.POST
    );
    await expectRecoveredLogin(page);
    for (const url of tracker.urls()) {
      const { search, searchParams } = new URL(url);
      const keys = [...searchParams.keys()];
      for (const secretParam of E2E_RECOVERY_SECRET_PARAMS) {
        expect(keys).not.toContain(secretParam);
      }
      expect(
        keys.filter(
          (key) =>
            !E2E_RECOVERY_ALLOWED_PARAMS.includes(key)
        )
      ).toEqual([]);
      expect(search).not.toContain(pin);
      expect(search).not.toContain(
        encodeURIComponent(E2E_RECOVERY_PASSWORDS.NEW)
      );
      expect(search).not.toContain(
        E2E_RECOVERY_PASSWORDS.NEW
      );
    }
    expect([
      ...new URL(page.url()).searchParams.keys(),
    ]).toEqual([LOGIN_NOTICE_QUERY_PARAM]);
  });
});
