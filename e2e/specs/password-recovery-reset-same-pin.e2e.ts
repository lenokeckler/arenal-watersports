import { E2E_LOGIN_COPY } from "../constants/E2eLogin.constants";
import {
  E2E_RECOVERY_COPY,
  E2E_RECOVERY_MAIL_COUNT,
} from "../constants/E2ePasswordRecovery.constants";
import {
  E2E_PARALLEL_CONSUMPTIONS,
  E2E_RECOVERY_OUTCOME,
  E2E_RECOVERY_RESET_PASSWORDS,
} from "../constants/E2ePasswordRecoveryReset.constants";
import { createLoginPage } from "../pages/Login.page";
import { createPasswordRecoveryResetPage } from "../pages/PasswordRecoveryReset.page";
import { consumeRecoveryPinConcurrently } from "../support/consumeRecoveryPinConcurrently";
import { countSpentRecoveryPins } from "../support/countSpentRecoveryPins";
import { readRecoveryOutcome } from "../support/readRecoveryOutcome";
import { readWorkerIdByUsername } from "../support/readWorkerIdByUsername";
import { expect, test } from "../support/recoveryTest";
import { requestAndReadRecoveryPin } from "../support/requestAndReadRecoveryPin";
import { signInWithCredentials } from "../support/signInWithCredentials";

test.describe("Password recovery with one PIN used twice at once", () => {
  test("ends with one recovered sign-in, one generic PIN error and exactly one working password", async ({
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
    ).toHaveLength(E2E_RECOVERY_MAIL_COUNT.ONE);
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

  test("lets exactly one of two parallel consumptions of the same PIN through and spends it once", async ({
    page,
    recoveryAccount,
  }) => {
    const pin = await requestAndReadRecoveryPin(
      page,
      recoveryAccount
    );
    const workerId = await readWorkerIdByUsername(
      recoveryAccount.username
    );

    const results = await consumeRecoveryPinConcurrently(
      recoveryAccount.username,
      pin
    );

    expect(results).toHaveLength(E2E_PARALLEL_CONSUMPTIONS);
    expect(results.filter(Boolean)).toEqual([workerId]);
    expect(await countSpentRecoveryPins(workerId)).toBe(
      E2E_RECOVERY_MAIL_COUNT.ONE
    );
  });
});
