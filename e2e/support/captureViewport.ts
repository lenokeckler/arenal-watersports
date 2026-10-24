import type { Page } from "@playwright/test";
import {
  E2E_SCREENSHOT_VIEWPORT_ONLY,
  resolveScreenshotPath,
} from "../constants/E2eScreenshot.constants";

export const captureViewport = async (
  page: Page,
  fileName: string,
  fullPage = !E2E_SCREENSHOT_VIEWPORT_ONLY
): Promise<void> => {
  await page.screenshot({
    fullPage,
    path: resolveScreenshotPath(fileName),
  });
};
