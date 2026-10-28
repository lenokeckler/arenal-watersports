import { expect, test } from "@playwright/test";
import { captureFullPage } from "../support/captureFullPage";
import { createLoginPage } from "../pages/Login.page";
import {
  E2E_LOGIN_BLOCKED_ACCOUNT,
  E2E_LOGIN_COPY,
  E2E_LOGIN_NOTICE_REASON,
  E2E_LOGIN_SCREENSHOT_BASENAME,
  E2E_LOGIN_SEEDED_PASSWORD,
  E2E_LOGIN_TOGGLE_LABEL,
  E2E_LOGIN_WRONG_PASSWORD,
} from "../constants/E2eLogin.constants";

test.describe("Login error screenshots", () => {
  test("captures the account blocked by attempts", async ({
    page,
  }, testInfo) => {
    const loginPage = createLoginPage(page);
    await loginPage.goTo();
    await loginPage.fillUsername(
      E2E_LOGIN_BLOCKED_ACCOUNT.BY_ATTEMPTS
    );
    await loginPage.fillPassword(E2E_LOGIN_SEEDED_PASSWORD);

    await loginPage.submit();
    await expect(loginPage.getBanner()).toContainText(
      E2E_LOGIN_COPY.BLOCKED_BY_ATTEMPTS
    );

    await captureFullPage(
      page,
      E2E_LOGIN_SCREENSHOT_BASENAME.BLOCKED_BY_ATTEMPTS,
      testInfo.project.name
    );
  });

  test("captures the account blocked by administration", async ({
    page,
  }, testInfo) => {
    const loginPage = createLoginPage(page);
    await loginPage.goTo();
    await loginPage.fillUsername(
      E2E_LOGIN_BLOCKED_ACCOUNT.BY_ADMINISTRATION
    );
    await loginPage.fillPassword(E2E_LOGIN_SEEDED_PASSWORD);

    await loginPage.submit();
    await expect(loginPage.getBanner()).toContainText(
      E2E_LOGIN_COPY.BLOCKED_BY_ADMINISTRATION
    );

    await captureFullPage(
      page,
      E2E_LOGIN_SCREENSHOT_BASENAME.BLOCKED_BY_ADMINISTRATION,
      testInfo.project.name
    );
  });

  test("captures the generic credentials error of a blocked account", async ({
    page,
  }, testInfo) => {
    const loginPage = createLoginPage(page);
    await loginPage.goTo();
    await loginPage.fillUsername(
      E2E_LOGIN_BLOCKED_ACCOUNT.BY_ADMINISTRATION
    );
    await loginPage.fillPassword(E2E_LOGIN_WRONG_PASSWORD);

    await loginPage.submit();
    await expect(loginPage.getPasswordError()).toHaveText(
      E2E_LOGIN_COPY.INVALID_CREDENTIALS
    );
    await loginPage.togglePasswordVisibility(
      E2E_LOGIN_TOGGLE_LABEL.SHOW
    );

    await captureFullPage(
      page,
      E2E_LOGIN_SCREENSHOT_BASENAME.GENERIC_CREDENTIALS,
      testInfo.project.name
    );
  });

  test("captures the inactivity notice", async ({
    page,
  }, testInfo) => {
    const loginPage = createLoginPage(page);

    await loginPage.goTo(E2E_LOGIN_NOTICE_REASON.INACTIVE);
    await expect(loginPage.getBanner()).toContainText(
      E2E_LOGIN_COPY.INACTIVITY_NOTICE
    );

    await captureFullPage(
      page,
      E2E_LOGIN_SCREENSHOT_BASENAME.INACTIVITY_NOTICE,
      testInfo.project.name
    );
  });
});
