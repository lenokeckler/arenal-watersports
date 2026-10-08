import { PATHS } from "@/app/constants";
import {
  E2E_FIRST_SIGN_IN_COPY,
  E2E_FIRST_SIGN_IN_PASSWORDS,
  E2E_PASSWORD_RULE_STATE,
  E2E_PASSWORD_RULES,
} from "../constants/E2eFirstSignIn.constants";
import { createFirstSignInPage } from "../pages/FirstSignIn.page";
import { createHomePage } from "../pages/Home.page";
import { createLoginPage } from "../pages/Login.page";
import { expect, test } from "../support/pendingWorkerTest";
import { readPendingPasswordClaim } from "../support/readPendingPasswordClaim";
import { signInAsPendingWorker } from "../support/signInAsPendingWorker";

test.describe("First sign-in", () => {
  test("keeps a pending account on the first sign-in screen", async ({
    page,
    pendingWorker,
  }) => {
    await signInAsPendingWorker(page, pendingWorker);
    const homePage = createHomePage(page);
    const firstSignInPage = createFirstSignInPage(page);

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

  test("shows the five rules before typing and ticks them as the password is typed", async ({
    page,
    pendingWorker,
  }) => {
    await signInAsPendingWorker(page, pendingWorker);
    const firstSignInPage = createFirstSignInPage(page);

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
        E2E_PASSWORD_RULES[0],
        E2E_PASSWORD_RULE_STATE.MET
      )
    ).toBeVisible();
    await expect(
      firstSignInPage.getRuleItem(
        E2E_PASSWORD_RULES[2],
        E2E_PASSWORD_RULE_STATE.MET
      )
    ).toBeVisible();
    await expect(
      firstSignInPage.getRuleItem(
        E2E_PASSWORD_RULES[1],
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

  test("rejects a wrong temporary password and stays on the screen", async ({
    page,
    pendingWorker,
  }) => {
    await signInAsPendingWorker(page, pendingWorker);
    const firstSignInPage = createFirstSignInPage(page);
    await firstSignInPage.fillCurrentPassword(
      E2E_FIRST_SIGN_IN_PASSWORDS.WRONG_TEMPORARY
    );
    await firstSignInPage.fillNewPassword(
      E2E_FIRST_SIGN_IN_PASSWORDS.NEW
    );
    await firstSignInPage.fillConfirmPassword(
      E2E_FIRST_SIGN_IN_PASSWORDS.NEW
    );

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
    page,
    pendingWorker,
  }) => {
    await signInAsPendingWorker(page, pendingWorker);
    const firstSignInPage = createFirstSignInPage(page);
    await firstSignInPage.fillCurrentPassword(
      pendingWorker.temporaryPassword
    );
    await firstSignInPage.fillNewPassword(
      E2E_FIRST_SIGN_IN_PASSWORDS.WEAK
    );
    await firstSignInPage.fillConfirmPassword(
      E2E_FIRST_SIGN_IN_PASSWORDS.WEAK
    );

    await firstSignInPage.submit();

    await expect(
      firstSignInPage.getNewPasswordError()
    ).toHaveText(E2E_FIRST_SIGN_IN_COPY.NEW_PASSWORD_RULES);
    await expect(page).toHaveURL(
      PATHS.ACCESS.FIRST_SIGN_IN
    );
  });

  test("rejects a repetition that does not match", async ({
    page,
    pendingWorker,
  }) => {
    await signInAsPendingWorker(page, pendingWorker);
    const firstSignInPage = createFirstSignInPage(page);
    await firstSignInPage.fillCurrentPassword(
      pendingWorker.temporaryPassword
    );
    await firstSignInPage.fillNewPassword(
      E2E_FIRST_SIGN_IN_PASSWORDS.NEW
    );
    await firstSignInPage.fillConfirmPassword(
      E2E_FIRST_SIGN_IN_PASSWORDS.OTHER
    );

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

  test("saves a valid password, opens the system and signs in again with the new password", async ({
    context,
    page,
    pendingWorker,
  }) => {
    await signInAsPendingWorker(page, pendingWorker);
    const firstSignInPage = createFirstSignInPage(page);
    const loginPage = createLoginPage(page);
    await firstSignInPage.fillCurrentPassword(
      pendingWorker.temporaryPassword
    );
    await firstSignInPage.fillNewPassword(
      E2E_FIRST_SIGN_IN_PASSWORDS.NEW
    );
    await firstSignInPage.fillConfirmPassword(
      E2E_FIRST_SIGN_IN_PASSWORDS.NEW
    );

    await firstSignInPage.submit();
    await expect(page).toHaveURL(PATHS.HOME);

    await firstSignInPage.goTo();
    await expect(page).toHaveURL(PATHS.HOME);

    await context.clearCookies();
    await loginPage.goTo();
    await loginPage.fillUsername(pendingWorker.username);
    await loginPage.fillPassword(
      E2E_FIRST_SIGN_IN_PASSWORDS.NEW
    );
    await loginPage.submit();

    await expect(page).toHaveURL(PATHS.HOME);
  });

  test("sends a signed-out visitor to the login", async ({
    page,
  }) => {
    const firstSignInPage = createFirstSignInPage(page);

    await firstSignInPage.goTo();

    await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
  });
});
