import { PATHS } from "@/app/constants";
import {
  E2E_LOGIN_ACCOUNT,
  E2E_LOGIN_COPY,
  E2E_LOGIN_WRONG_PASSWORD,
} from "../constants/E2eLogin.constants";
import { createLoginPage } from "../pages/Login.page";
import { expect, test } from "../support/adminRecoveryTest";
import { openLoginAtAttemptLimit } from "../support/openLoginAtAttemptLimit";
import { submitLoginCredentials } from "../support/submitLoginCredentials";
import { submitRightPasswordAtLimit } from "../support/submitRightPasswordAtLimit";

test.describe("Administration recovery offer without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("refuses the right password at the limit and offers recovery", async ({
    page,
    seededAdmin,
  }) => {
    const loginPage = createLoginPage(page);

    await submitRightPasswordAtLimit(page, seededAdmin.id);

    await expect(loginPage.getFormError()).toContainText(
      E2E_LOGIN_COPY.ACCOUNT_RECOVERY_REQUIRED
    );
    await expect(
      loginPage.getRecoveryOfferLink()
    ).toHaveAttribute("href", PATHS.ACCESS.RECOVERY);
  });

  test("keeps the generic message and no offer for a wrong password at the limit", async ({
    page,
    seededAdmin,
  }) => {
    const loginPage = createLoginPage(page);
    await openLoginAtAttemptLimit(page, seededAdmin.id);

    await submitLoginCredentials(
      page,
      E2E_LOGIN_ACCOUNT.USERNAME,
      E2E_LOGIN_WRONG_PASSWORD
    );

    await expect(loginPage.getPasswordError()).toHaveText(
      E2E_LOGIN_COPY.INVALID_CREDENTIALS
    );
    await expect(
      loginPage.getRecoveryOfferLink()
    ).toHaveCount(0);
  });
});
