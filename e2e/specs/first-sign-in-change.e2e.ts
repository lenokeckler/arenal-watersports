import { PATHS } from "@/app/constants";
import { E2E_FIRST_SIGN_IN_PASSWORDS } from "../constants/E2eFirstSignIn.constants";
import { createFirstSignInPage } from "../pages/FirstSignIn.page";
import { createLoginPage } from "../pages/Login.page";
import { expect, test } from "../support/pendingWorkerTest";

test.describe("First sign-in password change", () => {
  test("saves a valid password, opens the system and signs in again with the new password", async ({
    context,
    firstSignInPage,
    page,
    pendingWorker,
  }) => {
    const loginPage = createLoginPage(page);
    await firstSignInPage.fillForm({
      confirmPassword: E2E_FIRST_SIGN_IN_PASSWORDS.NEW,
      currentPassword: pendingWorker.temporaryPassword,
      newPassword: E2E_FIRST_SIGN_IN_PASSWORDS.NEW,
    });

    await firstSignInPage.submit();
    await expect(page).toHaveURL(PATHS.BOARD);

    await firstSignInPage.goTo();
    await expect(page).toHaveURL(PATHS.BOARD);

    await context.clearCookies();
    await loginPage.goTo();
    await loginPage.fillUsername(pendingWorker.username);
    await loginPage.fillPassword(
      E2E_FIRST_SIGN_IN_PASSWORDS.NEW
    );
    await loginPage.submit();

    await expect(page).toHaveURL(PATHS.BOARD);
  });

  test("sends a signed-out visitor to the login", async ({
    page,
  }) => {
    const firstSignInPage = createFirstSignInPage(page);

    await firstSignInPage.goTo();

    await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
  });
});
