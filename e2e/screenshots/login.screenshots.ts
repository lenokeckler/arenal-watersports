import { expect, test } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { captureViewport } from "../support/captureViewport";
import { createHomePage } from "../pages/Home.page";
import { createLoginPage } from "../pages/Login.page";
import { resolveDeviceScreenshotFileName } from "../constants/E2eScreenshot.constants";
import {
  E2E_LOGIN_ACCOUNT,
  E2E_LOGIN_COPY,
  E2E_LOGIN_SAMPLE_PASSWORD,
  E2E_LOGIN_SCREENSHOT_BASENAME,
  E2E_LOGIN_TOGGLE_LABEL,
  E2E_LOGIN_WRONG_PASSWORD,
} from "../constants/E2eLogin.constants";

test.describe("Login screenshots", () => {
  test("captures the empty form", async ({
    page,
  }, testInfo) => {
    const loginPage = createLoginPage(page);

    await loginPage.goTo();
    await loginPage.getHeading().waitFor();

    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        E2E_LOGIN_SCREENSHOT_BASENAME.EMPTY_FORM,
        testInfo.project.name
      )
    );
  });

  test("captures the field errors after an empty submit", async ({
    page,
  }, testInfo) => {
    const loginPage = createLoginPage(page);
    await loginPage.goTo();

    await loginPage.submit();
    await expect(loginPage.getUsernameError()).toHaveText(
      E2E_LOGIN_COPY.USERNAME_REQUIRED
    );

    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        E2E_LOGIN_SCREENSHOT_BASENAME.FIELD_ERRORS,
        testInfo.project.name
      )
    );
  });

  test("captures the wrong credentials error under the password", async ({
    page,
  }, testInfo) => {
    const loginPage = createLoginPage(page);
    await loginPage.goTo();
    await loginPage.fillUsername(
      E2E_LOGIN_ACCOUNT.USERNAME
    );
    await loginPage.fillPassword(E2E_LOGIN_WRONG_PASSWORD);

    await loginPage.submit();
    await expect(loginPage.getPasswordError()).toHaveText(
      E2E_LOGIN_COPY.INVALID_CREDENTIALS
    );

    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        E2E_LOGIN_SCREENSHOT_BASENAME.WRONG_CREDENTIALS,
        testInfo.project.name
      )
    );
  });

  test("captures the password visible with the eye", async ({
    page,
  }, testInfo) => {
    const loginPage = createLoginPage(page);
    await loginPage.goTo();
    await loginPage.fillUsername(
      E2E_LOGIN_ACCOUNT.USERNAME
    );
    await loginPage.fillPassword(E2E_LOGIN_SAMPLE_PASSWORD);

    await loginPage.togglePasswordVisibility(
      E2E_LOGIN_TOGGLE_LABEL.SHOW
    );
    await expect(
      loginPage.getPasswordToggle(
        E2E_LOGIN_TOGGLE_LABEL.HIDE
      )
    ).toBeVisible();

    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        E2E_LOGIN_SCREENSHOT_BASENAME.PASSWORD_VISIBLE,
        testInfo.project.name
      )
    );
  });

  test("captures the landing page after a successful sign-in", async ({
    page,
  }, testInfo) => {
    const loginPage = createLoginPage(page);
    const homePage = createHomePage(page);
    await loginPage.goTo();
    await loginPage.fillUsername(
      E2E_LOGIN_ACCOUNT.USERNAME
    );
    await loginPage.fillPassword(
      E2E_LOGIN_ACCOUNT.PASSWORD
    );

    await loginPage.submit();
    await expect(page).toHaveURL(PATHS.HOME);
    await homePage.getHeading().waitFor();

    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        E2E_LOGIN_SCREENSHOT_BASENAME.SIGNED_IN,
        testInfo.project.name
      )
    );
  });
});
