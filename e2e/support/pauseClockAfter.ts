import type { Page } from "@playwright/test";

export const pauseClockAfter = async (
  page: Page,
  delayMs: number
): Promise<void> => {
  const pageNow = await page.evaluate(() => Date.now());
  await page.clock.pauseAt(pageNow + delayMs);
};
