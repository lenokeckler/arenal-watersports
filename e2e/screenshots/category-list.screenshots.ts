import { test } from "@playwright/test";
import { captureViewport } from "../support/captureViewport";
import { createCategoryListPage } from "../pages/CategoryList.page";
import { logInAsAdmin } from "../support/logInAsAdmin";
import {
  removeDeletableCategory,
  seedDeletableCategory,
} from "../support/categoryFixtures";
import { resolveDeviceScreenshotFileName } from "../constants/E2eScreenshot.constants";
import {
  E2E_CATEGORY_LIST_CONFIRM_DELETE_SCREENSHOT_BASENAME,
  E2E_CATEGORY_LIST_SCREENSHOT_BASENAME,
} from "../constants/E2eCategoryList.constants";
import { resolveDeletableCategoryName } from "../constants/E2eCategoryFixtures.constants";

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

  test("captures the confirm-delete state of a card", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveDeletableCategoryName(
      testInfo.project.name,
      "screenshot"
    );
    await seedDeletableCategory(categoryName);
    const categoryListPage = createCategoryListPage(page);

    try {
      await logInAsAdmin(page);
      await categoryListPage.goTo();
      await categoryListPage.getHeading().waitFor();
      await categoryListPage.clickCategoryDeleteButton(
        categoryName
      );
      await categoryListPage
        .getCategoryConfirmDeleteMessage(categoryName)
        .scrollIntoViewIfNeeded();

      await captureViewport(
        page,
        resolveDeviceScreenshotFileName(
          E2E_CATEGORY_LIST_CONFIRM_DELETE_SCREENSHOT_BASENAME,
          testInfo.project.name
        )
      );
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });
});
