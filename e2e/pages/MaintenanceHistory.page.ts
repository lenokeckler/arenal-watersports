import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { MAINTENANCE_HISTORY_COPY } from "@/app/features/operations/maintenance-history/constants/MaintenanceHistoryCopy.constants";
import { getMainRegion } from "../support/mainRegion";

export const createMaintenanceHistoryPage = (
  page: Page
) => {
  const main = getMainRegion(page);

  return {
    getEntry: (unitCode: string): Locator =>
      main
        .getByRole(ARIA_ROLE.LISTITEM)
        .filter({ hasText: unitCode }),
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        name: MAINTENANCE_HISTORY_COPY.HEADING,
        exact: true,
      }),
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.OPERATIONS.MAINTENANCE_HISTORY);
    },
  };
};
