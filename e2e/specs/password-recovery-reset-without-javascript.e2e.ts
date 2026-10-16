import { API, PATHS, STRING } from "@/app/constants";
import { E2E_RECOVERY_PASSWORDS } from "../constants/E2ePasswordRecoveryPin.constants";
import { createPasswordRecoveryRequestPage } from "../pages/PasswordRecoveryRequest.page";
import { createPasswordRecoveryResetPage } from "../pages/PasswordRecoveryReset.page";
import { expectRecoveredLogin } from "../support/expectRecoveredLogin";
import { expectRecoveryResetScreen } from "../support/expectRecoveryResetScreen";
import { readDeliveredRecoveryPin } from "../support/readDeliveredRecoveryPin";
import { expect, test } from "../support/recoveryTest";
import { requestRecoveryPin } from "../support/requestRecoveryPin";
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

  test("posts the reset form and lands on the sign-in with the notice", async ({
    page,
    recoveryAccount,
  }) => {
    const resetPage = createPasswordRecoveryResetPage(page);
    await requestRecoveryPin(
      page,
      recoveryAccount.username
    );
    await expectRecoveryResetScreen(
      page,
      recoveryAccount.username
    );
    const pin = await readDeliveredRecoveryPin(
      recoveryAccount.address ?? STRING.Empty
    );
    await resetPage.fillForm({
      confirmPassword: E2E_RECOVERY_PASSWORDS.NEW,
      newPassword: E2E_RECOVERY_PASSWORDS.NEW,
      pin,
    });
    const submission = waitForPostNavigation(page);

    await resetPage.submit();

    const request = await submission;
    expect(request.method()).toBe(API.METHODS.POST);
    expect(request.url()).not.toContain(
      E2E_RECOVERY_PASSWORDS.NEW
    );
    expect(request.url()).not.toContain(pin);
    await expectRecoveredLogin(page);
    expect(new URL(page.url()).pathname).toBe(
      PATHS.ACCESS.LOGIN
    );
  });
});
