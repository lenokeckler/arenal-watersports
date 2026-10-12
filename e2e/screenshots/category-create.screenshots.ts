import { test } from "@playwright/test";
import { captureViewport } from "../support/captureViewport";
import { createCategoryCreateFormPage } from "../pages/CategoryCreateForm.page";
import { logInAsAdmin } from "../support/logInAsAdmin";
import { resolveDeviceScreenshotFileName } from "../constants/E2eScreenshot.constants";
import { E2E_CATEGORY_CREATE_SCREENSHOT_BASENAME } from "../constants/E2eCategoryCreate.constants";

test.describe("Category create screenshots", () => {
  test("captures the ready state of the create form", async ({
    page,
  }, testInfo) => {
    const categoryCreateFormPage =
      createCategoryCreateFormPage(page);

    await logInAsAdmin(page);
    await categoryCreateFormPage.goTo();
    await categoryCreateFormPage.getHeading().waitFor();

    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        E2E_CATEGORY_CREATE_SCREENSHOT_BASENAME,
        testInfo.project.name
      )
    );
  });
});
