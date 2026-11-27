import type { Page } from "@playwright/test";
import {
  ARIA_ROLE,
  DAMAGE_CAUSE_LABELS,
  PATHS,
} from "@/app/constants";
import { DAMAGE_REPORT_COPY } from "@/app/features/operations/damage-report/constants/DamageReportCopy.constants";
import { getMainRegion } from "../support/mainRegion";
import { createDamageReportLocators } from "./DamageReport.locators";

export const createDamageReportPage = (page: Page) => {
  const main = getMainRegion(page);
  const locators = createDamageReportLocators(page);
  const press = (name: string): Promise<void> =>
    main
      .getByRole(ARIA_ROLE.BUTTON, { name, exact: true })
      .click();

  return {
    ...locators,
    chooseCause: (
      cause: keyof typeof DAMAGE_CAUSE_LABELS
    ): Promise<void> =>
      main
        .getByText(DAMAGE_CAUSE_LABELS[cause], {
          exact: true,
        })
        .click(),
    fillDescription: (description: string): Promise<void> =>
      locators.getDescriptionInput().fill(description),
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.OPERATIONS.DAMAGE_REPORT);
    },
    goToUnit: async (unitId: string): Promise<void> => {
      await page.goto(
        PATHS.OPERATIONS.DAMAGE_REPORT_FOR_UNIT(unitId)
      );
    },
    moreHits: () => press(DAMAGE_REPORT_COPY.HITS_MORE),
    submit: () => press(DAMAGE_REPORT_COPY.SUBMIT_BUTTON),
    submitLater: () =>
      press(DAMAGE_REPORT_COPY.SUBMIT_LATER_BUTTON),
  };
};
