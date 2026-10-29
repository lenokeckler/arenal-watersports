import { expect, test } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { createDispatchBoardPage } from "../pages/DispatchBoard.page";
import { createLoginPage } from "../pages/Login.page";

test.describe("Dispatch board access", () => {
  test("redirects to sign in without a session", async ({
    page,
  }) => {
    const dispatchBoardPage = createDispatchBoardPage(page);
    const loginPage = createLoginPage(page);

    await dispatchBoardPage.goTo();

    await expect(page).toHaveURL(
      (url) => url.pathname === PATHS.ACCESS.LOGIN
    );
    await expect(loginPage.getHeading()).toBeVisible();
  });
});
