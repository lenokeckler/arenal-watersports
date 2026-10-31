import { test } from "@playwright/test";
import { captureViewport } from "../support/captureViewport";
import { createCategoryListPage } from "../pages/CategoryList.page";
import { logInAsAdmin } from "../support/logInAsAdmin";
import { resolveDeviceScreenshotFileName } from "../constants/E2eScreenshot.constants";
import { E2E_CATEGORY_LIST_SCREENSHOT_BASENAME } from "../constants/E2eCategoryList.constants";

test.describe("Category list screenshots", () => {
  test("captures the ready state with cards", async ({
    page,
  }, testInfo) => {
    const categoryListPage = createCategoryListPage(page);

    await logInAsAdmin(page);
    await categoryListPage.goTo();
    await categoryListPage.getHeading().waitFor();

    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        E2E_CATEGORY_LIST_SCREENSHOT_BASENAME,
        testInfo.project.name
      )
    );
  });
});
