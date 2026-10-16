import { STRING } from "@/app/constants";
import { E2E_RECOVERY_COPY } from "../constants/E2ePasswordRecovery.constants";
import {
  E2E_RECOVERY_PASSWORDS,
  E2E_RECOVERY_PIN_LIMITS,
} from "../constants/E2ePasswordRecoveryPin.constants";
import { createPasswordRecoveryResetPage } from "../pages/PasswordRecoveryReset.page";
import { buildWrongPin } from "../support/buildWrongPin";
import { expectRecoveredLogin } from "../support/expectRecoveredLogin";
import { expect, test } from "../support/recoveryTest";
import { requestAndReadRecoveryPin } from "../support/requestAndReadRecoveryPin";

const NEW_PASSWORDS = {
  confirmPassword: E2E_RECOVERY_PASSWORDS.NEW,
  newPassword: E2E_RECOVERY_PASSWORDS.NEW,
} as const;

test.describe("Password recovery PIN errors", () => {
  test("shows one generic message on a wrong PIN, empties the PIN and keeps the passwords", async ({
    page,
    recoveryAccount,
  }) => {
    const resetPage = createPasswordRecoveryResetPage(page);
    const pin = await requestAndReadRecoveryPin(
      page,
      recoveryAccount
    );

    await resetPage.fillForm({
      ...NEW_PASSWORDS,
      pin: buildWrongPin(pin),
    });
    await resetPage.submit();

    await expect(resetPage.getPinError()).toHaveText(
      E2E_RECOVERY_COPY.PIN_INVALID
    );
    await expect(resetPage.getPinInput()).toHaveValue(
      STRING.Empty
    );
    await expect(
      resetPage.getNewPasswordInput()
    ).toHaveValue(NEW_PASSWORDS.newPassword);
    await expect(
      resetPage.getConfirmPasswordInput()
    ).toHaveValue(NEW_PASSWORDS.confirmPassword);
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
    await resetPage.fillForm({
      ...NEW_PASSWORDS,
      pin: buildWrongPin(pin),
    });

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
    await resetPage.fillForm({ ...NEW_PASSWORDS, pin });

    await resetPage.submit();

    await expectRecoveredLogin(page);
    await resetPage.goTo(recoveryAccount.username);
    await resetPage.fillForm({ ...NEW_PASSWORDS, pin });
    await resetPage.submit();
    await expect(resetPage.getPinError()).toHaveText(
      E2E_RECOVERY_COPY.PIN_INVALID
    );
  });
});
