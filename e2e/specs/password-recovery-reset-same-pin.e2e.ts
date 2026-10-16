import { E2E_LOGIN_COPY } from "../constants/E2eLogin.constants";
import { E2E_RECOVERY_COPY } from "../constants/E2ePasswordRecovery.constants";
import {
  E2E_RECOVERY_OUTCOME,
  E2E_RECOVERY_OUTCOME_COUNT,
  E2E_RECOVERY_RESET_PASSWORDS,
} from "../constants/E2ePasswordRecoveryReset.constants";
import { createLoginPage } from "../pages/Login.page";
import { createPasswordRecoveryResetPage } from "../pages/PasswordRecoveryReset.page";
import { readRecoveryOutcome } from "../support/readRecoveryOutcome";
import { expect, test } from "../support/recoveryTest";
import { requestAndReadRecoveryPin } from "../support/requestAndReadRecoveryPin";
import { signInWithCredentials } from "../support/signInWithCredentials";

test.describe("Password recovery with one PIN used twice at once", () => {
  test("accepts the PIN once and signs in with exactly one of the two passwords", async ({
    context,
    page,
    recoveryAccount,
  }) => {
    const pin = await requestAndReadRecoveryPin(
      page,
      recoveryAccount
    );
    const racers = [
      {
        page,
        password: E2E_RECOVERY_RESET_PASSWORDS.FIRST,
      },
      {
        page: await context.newPage(),
        password: E2E_RECOVERY_RESET_PASSWORDS.SECOND,
      },
    ];
    await createPasswordRecoveryResetPage(
      racers[1].page
    ).goTo(recoveryAccount.username);
    for (const racer of racers) {
      await createPasswordRecoveryResetPage(
        racer.page
      ).fillForm({
        confirmPassword: racer.password,
        newPassword: racer.password,
        pin,
      });
    }

    await Promise.all(
      racers.map((racer) =>
        createPasswordRecoveryResetPage(racer.page).submit()
      )
    );

    const outcomes = await Promise.all(
      racers.map((racer) => readRecoveryOutcome(racer.page))
    );
    expect(
      outcomes.filter(
        (outcome) =>
          outcome === E2E_RECOVERY_OUTCOME.RECOVERED
      )
    ).toHaveLength(E2E_RECOVERY_OUTCOME_COUNT.EXACTLY_ONE);
    const winner =
      racers[
        outcomes.indexOf(E2E_RECOVERY_OUTCOME.RECOVERED)
      ];
    const loser =
      racers[
        outcomes.indexOf(E2E_RECOVERY_OUTCOME.REFUSED)
      ];
    await expect(
      createPasswordRecoveryResetPage(
        loser.page
      ).getPinError()
    ).toHaveText(E2E_RECOVERY_COPY.PIN_INVALID);
    const loginPage = createLoginPage(loser.page);
    await loginPage.goTo();
    await loginPage.fillUsername(recoveryAccount.username);
    await loginPage.fillPassword(loser.password);
    await loginPage.submit();
    await expect(loginPage.getPasswordError()).toHaveText(
      E2E_LOGIN_COPY.INVALID_CREDENTIALS
    );
    await signInWithCredentials(
      winner.page,
      recoveryAccount.username,
      winner.password
    );
  });
});
