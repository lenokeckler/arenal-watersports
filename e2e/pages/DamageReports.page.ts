import type { Locator, Page } from "@playwright/test";
import {
  ARIA_ROLE,
  DAMAGE_CAUSE_LABELS,
  PATHS,
} from "@/app/constants";
import { DAMAGE_REPORTS_COPY } from "@/app/features/operations/damage-reports/constants/DamageReportsCopy.constants";
import { getMainRegion } from "../support/mainRegion";
import { createDamageReportsLocators } from "./DamageReports.locators";

const openCompletionOf = (
  reports: Locator,
  unitCode: string
): Promise<void> =>
  reports
    .filter({ hasText: unitCode })
    .getByRole(ARIA_ROLE.LINK, {
      name: DAMAGE_REPORTS_COPY.COMPLETE,
    })
    .click();

export const createDamageReportsPage = (page: Page) => {
  const main = getMainRegion(page);
  const locators = createDamageReportsLocators(page);
  const goToQuery = async (
    query: string
  ): Promise<void> => {
    await page.goto(
      `${PATHS.OPERATIONS.DAMAGE_REPORTS}${query}`
    );
  };

  return {
    ...locators,
    filterByCause: (
      cause: keyof typeof DAMAGE_CAUSE_LABELS
    ): Promise<void> =>
      main
        .getByRole(ARIA_ROLE.LINK, {
          name: new RegExp(
            `^${DAMAGE_CAUSE_LABELS[cause]}: `
          ),
        })
        .click(),
    openToday: (): Promise<void> =>
      main
        .getByRole(ARIA_ROLE.REGION, {
          name: DAMAGE_REPORTS_COPY.CALENDAR_LABEL,
        })
        .locator("a[aria-current='page']")
        .click(),
    goTo: () => goToQuery(""),
    goToCharts: () => goToQuery("?tab=charts"),
    goToLegacyUnit: (unitId: string) =>
      goToQuery(`?unidad=${unitId}`),
    openCompletion: (unitCode: string): Promise<void> =>
      openCompletionOf(locators.getReports(), unitCode),
  };
};
