import { STRING } from "@/app/constants";
import { E2E_RECOVERY_COPY } from "../constants/E2ePasswordRecovery.constants";
import { E2E_ACTIVE_WORKER } from "../constants/E2eActiveWorker.constants";
import {
  E2E_NEW_PASSWORDS,
  E2E_RECOVERY_PASSWORDS,
  E2E_RECOVERY_PIN_LIMITS,
} from "../constants/E2ePasswordRecoveryPin.constants";
import { createPasswordRecoveryResetPage } from "../pages/PasswordRecoveryReset.page";
import { backdateRecoveryPins } from "../support/backdateRecoveryPins";
import { expectRecoveredLogin } from "../support/expectRecoveredLogin";
import { expectRecoveryResetScreen } from "../support/expectRecoveryResetScreen";
import { expect, test } from "../support/recoveryTest";
import { requestAndReadRecoveryPin } from "../support/requestAndReadRecoveryPin";
import { requestRecoveryPin } from "../support/requestRecoveryPin";
import { signInWithCredentials } from "../support/signInWithCredentials";
import { trackPostRequests } from "../support/trackPostRequests";
import { waitForNewRecoveryPin } from "../support/waitForNewRecoveryPin";

test.describe("Password recovery PIN rules", () => {
  test("makes the older PIN useless once a second one is requested", async ({
    page,
    recoveryAccount,
  }) => {
    const resetPage = createPasswordRecoveryResetPage(page);
    const olderPin = await requestAndReadRecoveryPin(
      page,
      recoveryAccount
    );
    await backdateRecoveryPins(
      recoveryAccount.username,
      E2E_RECOVERY_PIN_LIMITS.BACKDATE_MS
    );
    await requestRecoveryPin(
      page,
      recoveryAccount.username
    );
    await expectRecoveryResetScreen(
      page,
      recoveryAccount.username
    );
    const newerPin = await waitForNewRecoveryPin(
      recoveryAccount.address ?? STRING.Empty,
      olderPin
    );

    await resetPage.fillForm({
      ...E2E_NEW_PASSWORDS,
      pin: olderPin,
    });
    await resetPage.submit();
    await expect(resetPage.getPinError()).toHaveText(
      E2E_RECOVERY_COPY.PIN_INVALID
    );
    await resetPage.fillPin(newerPin);
    await resetPage.submit();

    await expectRecoveredLogin(page);
  });

  test("refuses the right PIN once it has expired and leaves the old password working", async ({
    page,
    recoveryAccount,
  }) => {
    const resetPage = createPasswordRecoveryResetPage(page);
    const pin = await requestAndReadRecoveryPin(
      page,
      recoveryAccount
    );
    await backdateRecoveryPins(
      recoveryAccount.username,
      E2E_RECOVERY_PIN_LIMITS.EXPIRED_AGE_MS
    );

    await resetPage.fillForm({ ...E2E_NEW_PASSWORDS, pin });
    await resetPage.submit();

    await expect(resetPage.getPinError()).toHaveText(
      E2E_RECOVERY_COPY.PIN_INVALID
    );
    await signInWithCredentials(
      page,
      recoveryAccount.username,
      E2E_ACTIVE_WORKER.PASSWORD
    );
  });

  test("shows the password rules before typing and refuses a weak password without spending the PIN", async ({
    page,
    recoveryAccount,
  }) => {
    const resetPage = createPasswordRecoveryResetPage(page);
    const pin = await requestAndReadRecoveryPin(
      page,
      recoveryAccount
    );
    await expect(resetPage.getRulesTitle()).toBeVisible();
    const posts = trackPostRequests(page);
    const postsBeforeSubmit = posts.count();

    await resetPage.fillForm({
      confirmPassword: E2E_RECOVERY_PASSWORDS.WEAK,
      newPassword: E2E_RECOVERY_PASSWORDS.WEAK,
      pin,
    });
    await resetPage.submit();

    await expect(
      resetPage.getNewPasswordError()
    ).toHaveText(E2E_RECOVERY_COPY.NEW_PASSWORD_RULES);
    expect(posts.count()).toBe(postsBeforeSubmit);
    await resetPage.fillForm({ ...E2E_NEW_PASSWORDS, pin });
    await resetPage.submit();
    await expectRecoveredLogin(page);
  });
});
