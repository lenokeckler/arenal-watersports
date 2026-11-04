import type { Page } from "@playwright/test";
import {
  THEME_STORAGE_KEY,
  type Theme,
} from "@/app/constants";

export const setInventoryScreenshotTheme = async (
  page: Page,
  theme: Theme
): Promise<void> => {
  await page.addInitScript(
    ({ key, value }) => localStorage.setItem(key, value),
    { key: THEME_STORAGE_KEY, value: theme }
  );
};
