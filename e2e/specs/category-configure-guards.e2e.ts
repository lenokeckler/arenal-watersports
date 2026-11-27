import { expect, test } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { createCategoryConfigurePage } from "../pages/CategoryConfigure.page";
import { logInAsAdmin } from "../support/logInAsAdmin";
import { E2E_UNKNOWN_CATEGORY_ID } from "../constants/E2eCategoryBehavior.constants";
import {
  E2E_COUNT,
  E2E_SIGNED_OUT_STORAGE_STATE,
} from "../constants/E2eRuntime.constants";

test.describe("Category configure guards", () => {
  test("an unknown category id shows the not-found page", async ({
    page,
  }) => {
    const configurePage = createCategoryConfigurePage(page);

    await logInAsAdmin(page);
    await configurePage.goTo(E2E_UNKNOWN_CATEGORY_ID);

    await expect(
      configurePage.getNotFoundMessage()
    ).toBeVisible();
    await expect(
      configurePage.getSectionHeadings()
    ).toHaveCount(E2E_COUNT.NONE);
  });

  test.describe("Signed-out visitor", () => {
    test.use({
      storageState: E2E_SIGNED_OUT_STORAGE_STATE,
    });

    test("sends a signed-out visitor to the login", async ({
      page,
    }) => {
      const configurePage =
        createCategoryConfigurePage(page);

      await configurePage.goTo(E2E_UNKNOWN_CATEGORY_ID);

      await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
    });
  });
});
