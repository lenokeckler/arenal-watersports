import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { MAINTENANCE_COST_COPY } from "@/app/features/administration/maintenance-cost-report/constants/MaintenanceCostReportCopy.constants";
import { getMainRegion } from "../support/mainRegion";

export const createMaintenanceCostPage = (page: Page) => {
  const main = getMainRegion(page);

  return {
    getEntry: (unitCode: string): Locator =>
      main
        .getByRole(ARIA_ROLE.LISTITEM)
        .filter({ hasText: unitCode }),
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        name: MAINTENANCE_COST_COPY.HEADING,
        exact: true,
      }),
    goTo: async (): Promise<void> => {
      await page.goto(
        PATHS.ADMINISTRATION.MAINTENANCE_COST
      );
    },
  };
};
