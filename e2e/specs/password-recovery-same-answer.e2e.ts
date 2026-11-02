import { readRecoveryAddress } from "../support/readRecoveryAddress";
import { PASSWORD_RESET_PIN, PATHS } from "@/app/constants";
import {
  E2E_MAILED_INELIGIBLE_SCENARIOS,
  E2E_RECOVERY_COPY,
  E2E_RECOVERY_MAIL_COUNT,
  E2E_RECOVERY_PIN_MAIL,
  E2E_RECOVERY_SCENARIO,
  E2E_UNADDRESSED_SCENARIOS,
} from "../constants/E2ePasswordRecovery.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { createPasswordRecoveryRequestPage } from "../pages/PasswordRecoveryRequest.page";
import { expectRecoveryResetScreen } from "../support/expectRecoveryResetScreen";
import { readRecoveryPin } from "../support/readRecoveryPin";
import { expect, test } from "../support/recoveryTest";
import { requestRecoveryPin } from "../support/requestRecoveryPin";
import { waitForDeliveredMail } from "../support/waitForDeliveredMail";
import { waitForMailTo } from "../support/waitForMailTo";

test.describe("Password recovery gives the same answer", () => {
  for (const scenario of E2E_MAILED_INELIGIBLE_SCENARIOS) {
    test.describe(`for a ${scenario} account`, () => {
      test.use({ recoveryScenario: scenario });

      test("lands on the reset screen and sends no mail", async ({
        page,
        recoveryAccount,
      }) => {
        const address =
          readRecoveryAddress(recoveryAccount);

        await requestRecoveryPin(
          page,
          recoveryAccount.username
        );

        await expectRecoveryResetScreen(
          page,
          recoveryAccount.username
        );
        expect(await waitForMailTo(address)).toHaveLength(
          E2E_COUNT.NONE
        );
      });
    });
  }

  for (const scenario of E2E_UNADDRESSED_SCENARIOS) {
    test.describe(`for a ${scenario} account`, () => {
      test.use({ recoveryScenario: scenario });

      test("lands on the reset screen", async ({
        page,
        recoveryAccount,
      }) => {
        await requestRecoveryPin(
          page,
          recoveryAccount.username
        );

        await expectRecoveryResetScreen(
          page,
          recoveryAccount.username
        );
      });
    });
  }

  test.describe("for an eligible account", () => {
    test.use({
      recoveryScenario: E2E_RECOVERY_SCENARIO.ELIGIBLE,
    });

    test("lands on the reset screen and sends exactly one mail with a PIN", async ({
      page,
      recoveryAccount,
    }) => {
      const address = readRecoveryAddress(recoveryAccount);
      const requestPage =
        createPasswordRecoveryRequestPage(page);
      await requestPage.goTo();
      await expect(
        requestPage.getNoEmailNote()
      ).toBeVisible();
      await requestPage.fillUsername(
        recoveryAccount.username
      );

      await requestPage.submit();

      await expectRecoveryResetScreen(
        page,
        recoveryAccount.username
      );
      const mails = await waitForDeliveredMail(address);
      expect(mails).toHaveLength(
        E2E_RECOVERY_MAIL_COUNT.ONE
      );
      expect(mails[E2E_COUNT.NONE].Subject).toBe(
        E2E_RECOVERY_PIN_MAIL.SUBJECT
      );
      expect(await readRecoveryPin(address)).toMatch(
        PASSWORD_RESET_PIN.PATTERN
      );
    });
  });

  test("keeps the request screen and shows the field error for an empty username", async ({
    page,
  }) => {
    const requestPage =
      createPasswordRecoveryRequestPage(page);
    await requestPage.goTo();

    await requestPage.submit();

    await expect(requestPage.getUsernameError()).toHaveText(
      E2E_RECOVERY_COPY.USERNAME_REQUIRED
    );
    await expect(page).toHaveURL(PATHS.ACCESS.RECOVERY);
  });
});
