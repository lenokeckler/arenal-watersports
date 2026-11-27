import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { DAMAGE_REPORTS_COPY } from "@/app/features/operations/damage-reports/constants/DamageReportsCopy.constants";
import { getMainRegion } from "../support/mainRegion";

export const createDamageReportsLocators = (page: Page) => {
  const main = getMainRegion(page);
  const getReports = (): Locator => page.locator("article");

  return {
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        name: DAMAGE_REPORTS_COPY.HEADING,
        exact: true,
      }),
    getReport: (unitCode: string): Locator =>
      getReports().filter({ hasText: unitCode }).first(),
    getReports,
    getSaved: (message: string): Locator =>
      main.getByText(message),
  };
};
