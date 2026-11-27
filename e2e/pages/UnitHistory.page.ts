import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { UNIT_HISTORY_COPY } from "@/app/features/operations/unit-history/constants/UnitHistoryCopy.constants";
import { getMainRegion } from "../support/mainRegion";

export const createUnitHistoryPage = (page: Page) => {
  const main = getMainRegion(page);

  return {
    getDamage: (): Locator =>
      main.locator("article").filter({
        hasText: UNIT_HISTORY_COPY.HITS_ADDED(0).replace(
          "0",
          ""
        ),
      }),
    getHeading: (code: string): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        name: code,
        exact: true,
      }),
    getJob: (description: string): Locator =>
      main
        .locator("article")
        .filter({ hasText: description }),
    getNotFound: (): Locator =>
      main.getByText(UNIT_HISTORY_COPY.NOT_FOUND),
    goTo: async (unitId: string): Promise<void> => {
      await page.goto(
        PATHS.OPERATIONS.UNIT_HISTORY(unitId)
      );
    },
  };
};
