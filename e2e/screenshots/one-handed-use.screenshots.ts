import { expect, test } from "@playwright/test";
import { E2E_ONE_HANDED_USE_SCREENSHOT_BASENAME } from "../constants/E2eOneHandedUse.constants";
import {
  E2E_NEXT_DEV_INDICATOR_SELECTOR,
  resolveDeviceScreenshotFileName,
} from "../constants/E2eScreenshot.constants";
import { createOneHandedUsePage } from "../pages/OneHandedUse.page";
import { captureViewport } from "../support/captureViewport";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test("captures the one-handed reservation form", async ({
  page,
}, testInfo) => {
  await signInAsSeededWorker(page);
  const oneHandedUsePage = createOneHandedUsePage(page);

  await oneHandedUsePage.goTo();
  await expect(oneHandedUsePage.getHeading()).toBeVisible();
  await page
    .locator(E2E_NEXT_DEV_INDICATOR_SELECTOR)
    .evaluateAll((indicators) =>
      indicators.forEach((indicator) => indicator.remove())
    );
  await captureViewport(
    page,
    resolveDeviceScreenshotFileName(
      E2E_ONE_HANDED_USE_SCREENSHOT_BASENAME,
      testInfo.project.name
    )
  );
});
