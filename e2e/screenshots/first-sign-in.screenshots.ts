import { expect } from "@playwright/test";
import {
  E2E_FIRST_SIGN_IN_COPY,
  E2E_FIRST_SIGN_IN_PASSWORDS,
  E2E_FIRST_SIGN_IN_SCREENSHOT_BASENAME,
  E2E_PASSWORD_RULE_STATE,
  E2E_PASSWORD_RULES,
} from "../constants/E2eFirstSignIn.constants";
import { resolveDeviceScreenshotFileName } from "../constants/E2eScreenshot.constants";
import { createFirstSignInPage } from "../pages/FirstSignIn.page";
import { captureViewport } from "../support/captureViewport";
import { test } from "../support/pendingWorkerTest";
import { signInAsPendingWorker } from "../support/signInAsPendingWorker";

test.describe("First sign-in screenshots", () => {
  test("captures the screen with the rules before typing", async ({
    page,
    pendingWorker,
  }, testInfo) => {
    await signInAsPendingWorker(page, pendingWorker);
    const firstSignInPage = createFirstSignInPage(page);
    await expect(
      firstSignInPage.getRulesTitle()
    ).toBeVisible();

    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        E2E_FIRST_SIGN_IN_SCREENSHOT_BASENAME.INITIAL,
        testInfo.project.name
      )
    );
  });

  test("captures the rules partly met", async ({
    page,
    pendingWorker,
  }, testInfo) => {
    await signInAsPendingWorker(page, pendingWorker);
    const firstSignInPage = createFirstSignInPage(page);

    await firstSignInPage.fillNewPassword(
      E2E_FIRST_SIGN_IN_PASSWORDS.LOWERCASE_ONLY
    );
    await expect(
      firstSignInPage.getRuleItem(
        E2E_PASSWORD_RULES[0],
        E2E_PASSWORD_RULE_STATE.MET
      )
    ).toBeVisible();

    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        E2E_FIRST_SIGN_IN_SCREENSHOT_BASENAME.RULES_PARTLY_MET,
        testInfo.project.name
      )
    );
  });

  test("captures the wrong temporary password error", async ({
    page,
    pendingWorker,
  }, testInfo) => {
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

    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        E2E_FIRST_SIGN_IN_SCREENSHOT_BASENAME.WRONG_TEMPORARY,
        testInfo.project.name
      )
    );
  });

  test("captures the weak password error", async ({
    page,
    pendingWorker,
  }, testInfo) => {
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

    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        E2E_FIRST_SIGN_IN_SCREENSHOT_BASENAME.WEAK_PASSWORD,
        testInfo.project.name
      )
    );
  });

  test("captures the mismatched repetition error", async ({
    page,
    pendingWorker,
  }, testInfo) => {
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

    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        E2E_FIRST_SIGN_IN_SCREENSHOT_BASENAME.MISMATCH,
        testInfo.project.name
      )
    );
  });
});
