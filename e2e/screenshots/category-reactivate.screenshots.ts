import { expect, test } from "@playwright/test";
import { CATEGORY_CATALOG_COPY } from "@/app/features/administration/category-catalog/constants/CategoryCatalogCopy.constants";
import {
  E2E_CATEGORY_REACTIVATE_SCREENSHOT_BASENAME,
  E2E_TOAST_DISMISS_TIMEOUT_MILLISECONDS,
} from "../constants/E2eCategoryList.constants";
import { resolveReactivateCategoryName } from "../constants/E2eCategoryFixtures.constants";
import { resolveDeviceScreenshotFileName } from "../constants/E2eScreenshot.constants";
import { createCategoryReactivatePage } from "../pages/CategoryReactivate.page";
import {
  removeCategoryWithRecords,
  seedCategoryWithRecords,
} from "../support/categoryRecordsFixtures";
import { captureViewport } from "../support/captureViewport";
import { logInAsAdmin } from "../support/logInAsAdmin";

test.describe("Category reactivation screenshots", () => {
  test("captures an inactive card with its Reactivar action", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveReactivateCategoryName(
      testInfo.project.name
    );
    await seedCategoryWithRecords(categoryName);
    const categoryListPage =
      createCategoryReactivatePage(page);

    try {
      await logInAsAdmin(page);
      await categoryListPage.goTo();
      await categoryListPage.clickCategoryMarkInactiveButton(
        categoryName
      );
      await categoryListPage
        .getReactivateButton(categoryName)
        .waitFor();
      await expect(
        page.getByText(
          CATEGORY_CATALOG_COPY.MARK_INACTIVE_SUCCESS_TOAST
        )
      ).toHaveCount(0, {
        timeout: E2E_TOAST_DISMISS_TIMEOUT_MILLISECONDS,
      });
      await categoryListPage
        .getReactivateButton(categoryName)
        .scrollIntoViewIfNeeded();

      await captureViewport(
        page,
        resolveDeviceScreenshotFileName(
          E2E_CATEGORY_REACTIVATE_SCREENSHOT_BASENAME,
          testInfo.project.name
        )
      );
    } finally {
      await removeCategoryWithRecords(categoryName);
    }
  });
});
