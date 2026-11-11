import { PATHS } from "@/app/constants";
import {
  E2E_FIRST_SIGN_IN_COPY,
  E2E_FIRST_SIGN_IN_PASSWORDS,
} from "../constants/E2eFirstSignIn.constants";
import { createHomePage } from "../pages/Home.page";
import { expect, test } from "../support/pendingWorkerTest";
import { readPendingPasswordClaim } from "../support/readPendingPasswordClaim";

test.describe("First sign-in", () => {
  test("keeps a pending account on the first sign-in screen", async ({
    firstSignInPage,
    page,
  }) => {
    const homePage = createHomePage(page);

    await expect(firstSignInPage.getHeading()).toHaveText(
      E2E_FIRST_SIGN_IN_COPY.HEADING
    );
    await homePage.goTo();

    await expect(page).toHaveURL(
      PATHS.ACCESS.FIRST_SIGN_IN
    );
  });

  test("issues a session token that flags the pending password change", async ({
    pendingWorker,
  }) => {
    const claim = await readPendingPasswordClaim(
      pendingWorker.username,
      pendingWorker.temporaryPassword
    );

    expect(claim).toBe(true);
  });

  test("rejects a wrong temporary password and stays on the screen", async ({
    firstSignInPage,
    page,
  }) => {
    await firstSignInPage.fillForm({
      confirmPassword: E2E_FIRST_SIGN_IN_PASSWORDS.NEW,
      currentPassword:
        E2E_FIRST_SIGN_IN_PASSWORDS.WRONG_TEMPORARY,
      newPassword: E2E_FIRST_SIGN_IN_PASSWORDS.NEW,
    });

    await firstSignInPage.submit();

    await expect(
      firstSignInPage.getCurrentPasswordError()
    ).toHaveText(
      E2E_FIRST_SIGN_IN_COPY.CURRENT_PASSWORD_INVALID
    );
    await expect(page).toHaveURL(
      PATHS.ACCESS.FIRST_SIGN_IN
    );
  });

  test("rejects a weak new password", async ({
    firstSignInPage,
    page,
    pendingWorker,
  }) => {
    await firstSignInPage.fillForm({
      confirmPassword: E2E_FIRST_SIGN_IN_PASSWORDS.WEAK,
      currentPassword: pendingWorker.temporaryPassword,
      newPassword: E2E_FIRST_SIGN_IN_PASSWORDS.WEAK,
    });

    await firstSignInPage.submit();

    await expect(
      firstSignInPage.getNewPasswordError()
    ).toHaveText(E2E_FIRST_SIGN_IN_COPY.NEW_PASSWORD_RULES);
    await expect(page).toHaveURL(
      PATHS.ACCESS.FIRST_SIGN_IN
    );
  });

  test("rejects a repetition that does not match", async ({
    firstSignInPage,
    page,
    pendingWorker,
  }) => {
    await firstSignInPage.fillForm({
      confirmPassword: E2E_FIRST_SIGN_IN_PASSWORDS.OTHER,
      currentPassword: pendingWorker.temporaryPassword,
      newPassword: E2E_FIRST_SIGN_IN_PASSWORDS.NEW,
    });

    await firstSignInPage.submit();

    await expect(
      firstSignInPage.getConfirmPasswordError()
    ).toHaveText(
      E2E_FIRST_SIGN_IN_COPY.CONFIRMATION_MISMATCH
    );
    await expect(page).toHaveURL(
      PATHS.ACCESS.FIRST_SIGN_IN
    );
  });
});
