import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";

export const getMainRegion = (page: Page): Locator =>
  page.getByRole(ARIA_ROLE.MAIN);
