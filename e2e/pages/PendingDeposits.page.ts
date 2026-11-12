import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { getMainRegion } from "../support/mainRegion";

export const createPendingDepositsPage = (page: Page) => {
  const main = getMainRegion(page);

  return {
    getRow: (customerName: string): Locator =>
      main
        .getByRole(ARIA_ROLE.LISTITEM)
        .filter({ hasText: customerName }),
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.RESERVATIONS.DEPOSITS);
    },
  };
};
