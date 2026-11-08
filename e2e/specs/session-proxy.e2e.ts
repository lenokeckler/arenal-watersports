import { expect, test } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { E2E_SIGNED_OUT_STORAGE_STATE } from "../constants/E2eRuntime.constants";
import { createHomePage } from "../pages/Home.page";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Session proxy", () => {
  test.describe("signed-out visitor", () => {
    test.use({
      storageState: E2E_SIGNED_OUT_STORAGE_STATE,
    });

    test("is sent from the home page to login", async ({
      page,
    }) => {
      const homePage = createHomePage(page);

      await homePage.goTo();

      await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
    });
  });

  test.describe("signed-in worker", () => {
    test("can open the home page", async ({ page }) => {
      await signInAsSeededWorker(page);
      const homePage = createHomePage(page);

      await homePage.goTo();

      await expect(page).toHaveURL(PATHS.HOME);
    });
  });
});
