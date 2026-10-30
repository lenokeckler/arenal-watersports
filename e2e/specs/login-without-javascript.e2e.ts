import { API, PATHS, STRING } from "@/app/constants";
import {
  E2E_LOGIN_ACCOUNT,
  E2E_LOGIN_COPY,
  E2E_LOGIN_WRONG_PASSWORD,
} from "../constants/E2eLogin.constants";
import { createLoginPage } from "../pages/Login.page";
import { expect, test } from "../support/activeWorkerTest";

test.describe("Login without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("posts a wrong password without putting the credentials in the URL", async ({
    activeWorker,
    page,
  }) => {
    const loginPage = createLoginPage(page);
    await loginPage.goTo();
    await loginPage.fillUsername(activeWorker.username);
    await loginPage.fillPassword(E2E_LOGIN_WRONG_PASSWORD);
    const submission = loginPage.waitForSubmission();

    await loginPage.submit();

    const request = await submission;
    expect(request.method()).toBe(API.METHODS.POST);
    expect(new URL(request.url()).search).toBe(
      STRING.Empty
    );
    await expect(loginPage.getPasswordError()).toHaveText(
      E2E_LOGIN_COPY.INVALID_CREDENTIALS
    );
    expect(new URL(page.url()).search).toBe(STRING.Empty);
  });

  test("signs in the seeded account and lands on the home page", async ({
    page,
  }) => {
    const loginPage = createLoginPage(page);
    await loginPage.goTo();
    await loginPage.fillUsername(
      E2E_LOGIN_ACCOUNT.USERNAME
    );
    await loginPage.fillPassword(
      E2E_LOGIN_ACCOUNT.PASSWORD
    );

    await loginPage.submit();

    await expect(page).toHaveURL(PATHS.HOME);
  });
});
