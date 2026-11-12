import { expect, test } from "@playwright/test";
import {
  E2E_LOGIN_BLOCKED_ACCOUNT,
  E2E_LOGIN_COPY,
  E2E_LOGIN_NOTICE_REASON,
  E2E_LOGIN_SEEDED_PASSWORD,
  E2E_LOGIN_UNKNOWN_USERNAME,
  E2E_LOGIN_WRONG_PASSWORD,
} from "../constants/E2eLogin.constants";
import { createLoginPage } from "../pages/Login.page";

const UNRECOGNISED_REASONS = [
  E2E_LOGIN_NOTICE_REASON.UNKNOWN,
  E2E_LOGIN_NOTICE_REASON.SCRIPT,
];

test.describe("Login errors", () => {
  test("shows the attempts message for an account blocked by attempts", async ({
    page,
  }) => {
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
  });

  test("shows the administration message for an account blocked by administration", async ({
    page,
  }) => {
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
  });

  test("shows the generic credentials error for a blocked account with a wrong password", async ({
    page,
  }) => {
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
    await expect(loginPage.getBanner()).toHaveCount(0);
  });

  test("shows the same text for an unknown username as for a blocked account with a wrong password", async ({
    page,
  }) => {
    const loginPage = createLoginPage(page);
    await loginPage.goTo();
    await loginPage.fillUsername(
      E2E_LOGIN_BLOCKED_ACCOUNT.BY_ADMINISTRATION
    );
    await loginPage.fillPassword(E2E_LOGIN_WRONG_PASSWORD);
    await loginPage.submit();
    await expect(
      loginPage.getPasswordError()
    ).toBeVisible();
    const knownAccountText = await loginPage
      .getPasswordError()
      .innerText();

    await loginPage.goTo();
    await loginPage.fillUsername(
      E2E_LOGIN_UNKNOWN_USERNAME
    );
    await loginPage.fillPassword(E2E_LOGIN_WRONG_PASSWORD);
    await loginPage.submit();
    await expect(
      loginPage.getPasswordError()
    ).toBeVisible();
    const unknownAccountText = await loginPage
      .getPasswordError()
      .innerText();

    expect(unknownAccountText).toBe(knownAccountText);
    expect(unknownAccountText).toBe(
      E2E_LOGIN_COPY.INVALID_CREDENTIALS
    );
  });

  test("shows the inactivity message before typing and clears it after a submit", async ({
    page,
  }) => {
    const loginPage = createLoginPage(page);

    await loginPage.goTo(E2E_LOGIN_NOTICE_REASON.INACTIVE);

    await expect(loginPage.getBanner()).toContainText(
      E2E_LOGIN_COPY.INACTIVITY_NOTICE
    );

    await loginPage.fillUsername(
      E2E_LOGIN_UNKNOWN_USERNAME
    );
    await loginPage.fillPassword(E2E_LOGIN_WRONG_PASSWORD);
    await loginPage.submit();

    await expect(loginPage.getPasswordError()).toHaveText(
      E2E_LOGIN_COPY.INVALID_CREDENTIALS
    );
    await expect(loginPage.getBanner()).toHaveCount(0);
  });

  for (const reason of UNRECOGNISED_REASONS) {
    test(`shows no banner and none of the raw text for the reason ${reason}`, async ({
      page,
    }) => {
      const loginPage = createLoginPage(page);

      await loginPage.goTo(reason);
      await loginPage.getHeading().waitFor();

      await expect(loginPage.getBanner()).toHaveCount(0);
      await expect(page.locator("body")).not.toContainText(
        reason
      );
    });
  }
});
