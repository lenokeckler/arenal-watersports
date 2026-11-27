import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { MAINTENANCE_COPY } from "@/app/features/operations/maintenance/constants/MaintenanceCopy.constants";
import { getMainRegion } from "../support/mainRegion";

export const createMaintenanceLocators = (page: Page) => {
  const main = getMainRegion(page);
  const getHeadingNamed = (name: string): Locator =>
    main.getByRole(ARIA_ROLE.HEADING, {
      name,
      exact: true,
    });

  return {
    getAction: (name: string | RegExp): Locator =>
      main.getByRole(ARIA_ROLE.LINK, { name }),
    getAttentionChip: (unitCode: string): Locator =>
      page
        .getByRole(ARIA_ROLE.DIALOG)
        .getByRole(ARIA_ROLE.LINK, {
          name: new RegExp(`^${unitCode}`),
        }),
    getDay: (): Locator => page.getByRole(ARIA_ROLE.DIALOG),
    getCalendar: (): Locator =>
      main.getByRole(ARIA_ROLE.REGION, {
        name: MAINTENANCE_COPY.CALENDAR_LABEL,
      }),
    getHeading: (): Locator =>
      getHeadingNamed(MAINTENANCE_COPY.HEADING),
    getSpendHeading: (): Locator =>
      getHeadingNamed(MAINTENANCE_COPY.SPEND_HEADING),
  };
};
