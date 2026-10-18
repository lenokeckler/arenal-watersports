import { PATHS } from "@/app/constants";
import { E2E_ADMIN_ATTEMPT_LIMIT } from "../constants/E2eAdminRecovery.constants";
import {
  E2E_LOGIN_ACCOUNT,
  E2E_LOGIN_COPY,
} from "../constants/E2eLogin.constants";
import { createLoginPage } from "../pages/Login.page";
import { expect, test } from "../support/adminRecoveryTest";
import { setWorkerFailedAttempts } from "../support/setWorkerFailedAttempts";
import { submitLoginCredentials } from "../support/submitLoginCredentials";

test.describe("Administration recovery offer without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("refuses the right password at the limit and offers recovery", async ({
    page,
    seededAdmin,
  }) => {
    await setWorkerFailedAttempts(
      seededAdmin.id,
      E2E_ADMIN_ATTEMPT_LIMIT
    );
    const loginPage = createLoginPage(page);
    await loginPage.goTo();

    await submitLoginCredentials(
      page,
      E2E_LOGIN_ACCOUNT.USERNAME,
      E2E_LOGIN_ACCOUNT.PASSWORD
    );

    await expect(loginPage.getFormError()).toContainText(
      E2E_LOGIN_COPY.ACCOUNT_RECOVERY_REQUIRED
    );
    await expect(
      loginPage.getRecoveryOfferLink()
    ).toHaveAttribute("href", PATHS.ACCESS.RECOVERY);
  });
});
