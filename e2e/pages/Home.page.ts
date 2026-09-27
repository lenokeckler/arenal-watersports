import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";
import { getMainRegion } from "../support/mainRegion";

export const createHomePage = (page: Page) => {
  const goTo = async (): Promise<void> => {
    await page.goto(PATHS.HOME);
  };

  const getHeading = (): Locator =>
    getMainRegion(page).getByRole(ARIA_ROLE.HEADING, {
      level: HEADING_LEVEL.PAGE,
    });

  const getDocumentTitle = (): Promise<string> =>
    page.title();

  return {
    goTo,
    getHeading,
    getDocumentTitle,
  };
};
