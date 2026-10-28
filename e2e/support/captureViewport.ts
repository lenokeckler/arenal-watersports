import type { Page } from "@playwright/test";
import {
  E2E_SCREENSHOT_CAPTURE_STYLE,
  E2E_SCREENSHOT_VIEWPORT_ONLY,
  resolveScreenshotPath,
} from "../constants/E2eScreenshot.constants";

export const captureViewport = async (
  page: Page,
  fileName: string
): Promise<void> => {
  await page.screenshot({
    fullPage: E2E_SCREENSHOT_VIEWPORT_ONLY,
    path: resolveScreenshotPath(fileName),
    style: E2E_SCREENSHOT_CAPTURE_STYLE,
  });
};
