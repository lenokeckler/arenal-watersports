import { test } from "@playwright/test";
import { captureViewport } from "../support/captureViewport";
import { createCategoryBehaviorFormPage } from "../pages/CategoryBehaviorForm.page";
import { logInAsAdmin } from "../support/logInAsAdmin";
import {
  findCategoryId,
  removeDeletableCategory,
  seedCategoryWithBehavior,
} from "../support/categoryFixtures";
import { resolveDeviceScreenshotFileName } from "../constants/E2eScreenshot.constants";
import {
  E2E_CATEGORY_BEHAVIOR_SCREENSHOT_BASENAME,
  resolveCategoryBehaviorFixtureName,
} from "../constants/E2eCategoryBehavior.constants";

test.describe("Category behavior screenshots", () => {
  test("captures the ready state of the behavior form", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveCategoryBehaviorFixtureName(
      testInfo.project.name,
      "screenshot"
    );
    await seedCategoryWithBehavior(categoryName);
    const categoryBehaviorFormPage =
      createCategoryBehaviorFormPage(page);

    try {
      await logInAsAdmin(page);
      await categoryBehaviorFormPage.goTo(
        await findCategoryId(categoryName)
      );
      await categoryBehaviorFormPage.getHeading().waitFor();

      await captureViewport(
        page,
        resolveDeviceScreenshotFileName(
          E2E_CATEGORY_BEHAVIOR_SCREENSHOT_BASENAME,
          testInfo.project.name
        )
      );
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });
});
