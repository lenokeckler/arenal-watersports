import { expect, test } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { createHomePage } from "../pages/Home.page";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Session proxy", () => {
  test("sends a signed-out visitor from the home page to the login", async ({
    page,
  }) => {
    const homePage = createHomePage(page);

    await homePage.goTo();

    await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
  });

  test("lets a signed-in worker open the home page", async ({
    page,
  }) => {
    await signInAsSeededWorker(page);
    const homePage = createHomePage(page);

    await homePage.goTo();

    await expect(page).toHaveURL(PATHS.HOME);
  });
});
