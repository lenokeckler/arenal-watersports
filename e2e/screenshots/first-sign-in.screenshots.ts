import { PASSWORD_RULE } from "@/app/constants";
import { PASSWORD_CHANGE_FIELD } from "@/app/constants/access/PasswordChangeError.constants";
import {
  E2E_FIRST_SIGN_IN_COPY,
  E2E_FIRST_SIGN_IN_PASSWORDS,
  E2E_FIRST_SIGN_IN_SCREENSHOT_BASENAME,
  E2E_PASSWORD_RULE_STATE,
} from "../constants/E2eFirstSignIn.constants";
import { captureFullPage } from "../support/captureFullPage";
import { expect, test } from "../support/pendingWorkerTest";

test.describe("First sign-in screenshots", () => {
  test("captures the screen with the rules before typing", async ({
    firstSignInPage,
    page,
  }, testInfo) => {
    await expect(
      firstSignInPage.getRulesTitle()
    ).toBeVisible();

    await captureFullPage(
      page,
      E2E_FIRST_SIGN_IN_SCREENSHOT_BASENAME.INITIAL,
      testInfo.project.name
    );
  });

  test("captures the rules partly met", async ({
    firstSignInPage,
    page,
  }, testInfo) => {
    await firstSignInPage.fillNewPassword(
      E2E_FIRST_SIGN_IN_PASSWORDS.LOWERCASE_ONLY
    );
    await firstSignInPage.revealPassword(
      PASSWORD_CHANGE_FIELD.NEW_PASSWORD
    );
    await expect(
      firstSignInPage.getRuleItem(
        PASSWORD_RULE.LENGTH,
        E2E_PASSWORD_RULE_STATE.MET
      )
    ).toBeVisible();

    await captureFullPage(
      page,
      E2E_FIRST_SIGN_IN_SCREENSHOT_BASENAME.RULES_PARTLY_MET,
      testInfo.project.name
    );
  });

  test("captures the wrong temporary password error", async ({
    firstSignInPage,
    page,
  }, testInfo) => {
    await firstSignInPage.fillForm({
      confirmPassword: E2E_FIRST_SIGN_IN_PASSWORDS.NEW,
      currentPassword:
        E2E_FIRST_SIGN_IN_PASSWORDS.WRONG_TEMPORARY,
      newPassword: E2E_FIRST_SIGN_IN_PASSWORDS.NEW,
    });

    await firstSignInPage.revealPassword(
      PASSWORD_CHANGE_FIELD.CURRENT_PASSWORD
    );

    await firstSignInPage.submit();
    await expect(
      firstSignInPage.getCurrentPasswordError()
    ).toHaveText(
      E2E_FIRST_SIGN_IN_COPY.CURRENT_PASSWORD_INVALID
    );

    await captureFullPage(
      page,
      E2E_FIRST_SIGN_IN_SCREENSHOT_BASENAME.WRONG_TEMPORARY,
      testInfo.project.name
    );
  });

  test("captures the weak password error", async ({
    firstSignInPage,
    page,
    pendingWorker,
  }, testInfo) => {
    await firstSignInPage.fillForm({
      confirmPassword: E2E_FIRST_SIGN_IN_PASSWORDS.WEAK,
      currentPassword: pendingWorker.temporaryPassword,
      newPassword: E2E_FIRST_SIGN_IN_PASSWORDS.WEAK,
    });

    await firstSignInPage.revealPassword(
      PASSWORD_CHANGE_FIELD.NEW_PASSWORD
    );

    await firstSignInPage.submit();
    await expect(
      firstSignInPage.getNewPasswordError()
    ).toHaveText(E2E_FIRST_SIGN_IN_COPY.NEW_PASSWORD_RULES);

    await captureFullPage(
      page,
      E2E_FIRST_SIGN_IN_SCREENSHOT_BASENAME.WEAK_PASSWORD,
      testInfo.project.name
    );
  });

  test("captures the mismatched repetition error", async ({
    firstSignInPage,
    page,
    pendingWorker,
  }, testInfo) => {
    await firstSignInPage.fillForm({
      confirmPassword: E2E_FIRST_SIGN_IN_PASSWORDS.OTHER,
      currentPassword: pendingWorker.temporaryPassword,
      newPassword: E2E_FIRST_SIGN_IN_PASSWORDS.NEW,
    });

    await firstSignInPage.revealPassword(
      PASSWORD_CHANGE_FIELD.NEW_PASSWORD
    );
    await firstSignInPage.revealPassword(
      PASSWORD_CHANGE_FIELD.CONFIRM_PASSWORD
    );

    await firstSignInPage.submit();
    await expect(
      firstSignInPage.getConfirmPasswordError()
    ).toHaveText(
      E2E_FIRST_SIGN_IN_COPY.CONFIRMATION_MISMATCH
    );

    await captureFullPage(
      page,
      E2E_FIRST_SIGN_IN_SCREENSHOT_BASENAME.MISMATCH,
      testInfo.project.name
    );
  });
});
