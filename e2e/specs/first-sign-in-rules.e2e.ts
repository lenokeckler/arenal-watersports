import { PASSWORD_RULE } from "@/app/constants";
import {
  E2E_FIRST_SIGN_IN_PASSWORDS,
  E2E_PASSWORD_RULE_STATE,
  E2E_PASSWORD_RULES,
} from "../constants/E2eFirstSignIn.constants";
import { expect, test } from "../support/pendingWorkerTest";

test.describe("First sign-in rules checklist", () => {
  test("shows the five rules before typing and ticks them as the password is typed", async ({
    firstSignInPage,
  }) => {
    await expect(
      firstSignInPage.getRulesTitle()
    ).toBeVisible();
    for (const rule of E2E_PASSWORD_RULES) {
      await expect(
        firstSignInPage.getRuleItem(
          rule,
          E2E_PASSWORD_RULE_STATE.PENDING
        )
      ).toBeVisible();
    }

    await firstSignInPage.fillNewPassword(
      E2E_FIRST_SIGN_IN_PASSWORDS.LOWERCASE_ONLY
    );

    await expect(
      firstSignInPage.getRuleItem(
        PASSWORD_RULE.LENGTH,
        E2E_PASSWORD_RULE_STATE.MET
      )
    ).toBeVisible();
    await expect(
      firstSignInPage.getRuleItem(
        PASSWORD_RULE.LOWERCASE,
        E2E_PASSWORD_RULE_STATE.MET
      )
    ).toBeVisible();
    await expect(
      firstSignInPage.getRuleItem(
        PASSWORD_RULE.UPPERCASE,
        E2E_PASSWORD_RULE_STATE.PENDING
      )
    ).toBeVisible();

    await firstSignInPage.fillNewPassword(
      E2E_FIRST_SIGN_IN_PASSWORDS.NEW
    );

    for (const rule of E2E_PASSWORD_RULES) {
      await expect(
        firstSignInPage.getRuleItem(
          rule,
          E2E_PASSWORD_RULE_STATE.MET
        )
      ).toBeVisible();
    }
  });
});
