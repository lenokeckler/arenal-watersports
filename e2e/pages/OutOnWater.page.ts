import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { OUT_ON_WATER_COPY } from "@/app/features/operations/out-on-water/constants/OutOnWaterCopy.constants";
import { getMainRegion } from "../support/mainRegion";

export const createOutOnWaterPage = (page: Page) => {
  const main = getMainRegion(page);

  return {
    getGroup: (customerName: string): Locator =>
      main
        .getByRole(ARIA_ROLE.LISTITEM)
        .filter({ hasText: customerName }),
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        name: OUT_ON_WATER_COPY.HEADING,
      }),
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.OPERATIONS.OUT_ON_WATER);
    },
  };
};
