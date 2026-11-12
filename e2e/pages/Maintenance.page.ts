import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { MAINTENANCE_COPY } from "@/app/features/operations/maintenance/constants/MaintenanceCopy.constants";
import { getMainRegion } from "../support/mainRegion";

export const createMaintenancePage = (page: Page) => {
  const main = getMainRegion(page);

  return {
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        name: MAINTENANCE_COPY.HEADING,
        exact: true,
      }),
    getOilSection: (): Locator =>
      main.getByRole("region", {
        name: MAINTENANCE_COPY.OIL_HEADING,
      }),
    getServiceSection: (): Locator =>
      main.getByRole("region", {
        name: MAINTENANCE_COPY.SERVICE_HEADING,
      }),
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.OPERATIONS.MAINTENANCE);
    },
  };
};
