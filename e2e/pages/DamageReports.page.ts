import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { DAMAGE_REPORTS_COPY } from "@/app/features/operations/damage-reports/constants/DamageReportsCopy.constants";
import { getDamageReportsHref } from "@/app/features/operations/damage-reports/utils/getDamageReportsHref";
import { getMainRegion } from "../support/mainRegion";

export const createDamageReportsPage = (page: Page) => {
  const main = getMainRegion(page);

  return {
    getEmptyMessage: (): Locator =>
      main.getByText(DAMAGE_REPORTS_COPY.EMPTY),
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        name: DAMAGE_REPORTS_COPY.HEADING,
        exact: true,
      }),
    getReport: (description: string): Locator =>
      main
        .getByRole(ARIA_ROLE.LISTITEM)
        .filter({ hasText: description }),
    getReports: (): Locator =>
      main.getByRole(ARIA_ROLE.LISTITEM),
    getUnitNotFound: (): Locator =>
      main.getByText(DAMAGE_REPORTS_COPY.UNIT_NOT_FOUND),
    goTo: async (unitId: string): Promise<void> => {
      await page.goto(getDamageReportsHref(unitId));
    },
  };
};
