import { STRING } from "@/app/constants";
import { E2E_RECOVERY_COPY } from "../constants/E2ePasswordRecovery.constants";
import {
  E2E_RECOVERY_PASSWORDS,
  E2E_RECOVERY_PIN_LIMITS,
} from "../constants/E2ePasswordRecoveryPin.constants";
import { createPasswordRecoveryResetPage } from "../pages/PasswordRecoveryReset.page";
import { buildWrongPin } from "../support/buildWrongPin";
import { expect, test } from "../support/recoveryTest";
import { requestAndReadRecoveryPin } from "../support/requestAndReadRecoveryPin";
import { saveRecoveryPassword } from "../support/saveRecoveryPassword";
import { signInWithCredentials } from "../support/signInWithCredentials";
import { submitRecoveryPin } from "../support/submitRecoveryPin";

test.describe("Password recovery PIN errors", () => {
  test("shows one generic message on a wrong PIN and empties the PIN", async ({
    page,
    recoveryAccount,
  }) => {
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
    await expect(resetPage.getPinInput()).toHaveValue(
      STRING.Empty
    );
  });

  test("rejects the right PIN with the same message once five wrong PINs spent it", async ({
    page,
    recoveryAccount,
  }) => {
    const resetPage = createPasswordRecoveryResetPage(page);
    const pin = await requestAndReadRecoveryPin(
      page,
      recoveryAccount
    );

    for (
      let attempt = E2E_RECOVERY_PIN_LIMITS.FIRST_ATTEMPT;
      attempt < E2E_RECOVERY_PIN_LIMITS.ATTEMPTS;
      attempt += 1
    ) {
      await resetPage.fillPin(buildWrongPin(pin));
      await resetPage.submit();
      await expect(resetPage.getPinError()).toHaveText(
        E2E_RECOVERY_COPY.PIN_INVALID
      );
    }
    await resetPage.fillPin(pin);
    await resetPage.submit();

    await expect(resetPage.getPinError()).toHaveText(
      E2E_RECOVERY_COPY.PIN_INVALID
    );
    await expect(resetPage.getPinInput()).toHaveValue(
      STRING.Empty
    );
  });

  test("accepts the right PIN once and rejects the same PIN afterwards", async ({
    page,
    recoveryAccount,
  }) => {
    const resetPage = createPasswordRecoveryResetPage(page);
    const pin = await requestAndReadRecoveryPin(
      page,
      recoveryAccount
    );
    await submitRecoveryPin(page, pin);
    await saveRecoveryPassword(
      page,
      E2E_RECOVERY_PASSWORDS.NEW
    );
    await signInWithCredentials(
      page,
      recoveryAccount.username,
      E2E_RECOVERY_PASSWORDS.NEW
    );

    await resetPage.goTo(recoveryAccount.username);
    await resetPage.fillPin(pin);
    await resetPage.submit();

    await expect(resetPage.getPinError()).toHaveText(
      E2E_RECOVERY_COPY.PIN_INVALID
    );
  });
});
