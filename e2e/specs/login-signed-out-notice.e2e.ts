import { expect, test } from "@playwright/test";
import { LOGIN_NOTICE_QUERY_PARAM } from "@/app/constants";
import { createLoginPage } from "../pages/Login.page";

test.describe("Login signed-out notice", () => {
  test("shows the notice with empty fields, cleans the url and drops the notice on reload", async ({
    page,
  }) => {
    const loginPage = createLoginPage(page);

    await loginPage.goToSignedOut();

    await expect(
      loginPage.getSignedOutNotice()
    ).toBeVisible();
    await expect(loginPage.getUsernameInput()).toHaveValue(
      ""
    );
    await expect(loginPage.getPasswordInput()).toHaveValue(
      ""
    );
    await expect(page).not.toHaveURL(
      new RegExp(`[?&]${LOGIN_NOTICE_QUERY_PARAM}=`)
    );

    await page.reload();

    await expect(loginPage.getHeading()).toBeVisible();
    await expect(
      loginPage.getSignedOutNotice()
    ).toHaveCount(0);
  });
});
