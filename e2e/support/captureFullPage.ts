import type { Page } from "@playwright/test";
import {
  E2E_DEV_INDICATOR_HIDING_STYLE,
  E2E_SCREENSHOT_FULL_PAGE,
  resolveDeviceScreenshotFileName,
  resolveScreenshotPath,
} from "../constants/E2eScreenshot.constants";

export const captureFullPage = async (
  page: Page,
  baseName: string,
  projectName: string
): Promise<void> => {
  await page.addStyleTag({
    content: E2E_DEV_INDICATOR_HIDING_STYLE,
  });
  await page.screenshot({
    fullPage: E2E_SCREENSHOT_FULL_PAGE,
    path: resolveScreenshotPath(
      resolveDeviceScreenshotFileName(baseName, projectName)
    ),
  });
};
