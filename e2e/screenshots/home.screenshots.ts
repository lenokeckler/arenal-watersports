import { test } from "@playwright/test";
import { captureViewport } from "../support/captureViewport";
import { createHomePage } from "../pages/Home.page";
import { resolveDeviceScreenshotFileName } from "../constants/E2eScreenshot.constants";
import { E2E_HOME_SCREENSHOT_BASENAME } from "../constants/E2eHome.constants";

test.describe("Home screenshots", () => {
  test("captures the home page", async ({
    page,
  }, testInfo) => {
    const homePage = createHomePage(page);

    await homePage.goTo();
    await homePage.getHeading().waitFor();

    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        E2E_HOME_SCREENSHOT_BASENAME,
        testInfo.project.name
      )
    );
  });
});
