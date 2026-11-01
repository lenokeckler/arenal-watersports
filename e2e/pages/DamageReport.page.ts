import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { DAMAGE_REPORT_COPY } from "@/app/features/operations/damage-report/constants/DamageReportCopy.constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";
import { getMainRegion } from "../support/mainRegion";

export const createDamageReportPage = (page: Page) => {
  const mainRegion = getMainRegion(page);

  const getCauseSelect = (): Locator =>
    mainRegion.getByLabel(DAMAGE_REPORT_COPY.CAUSE_LABEL);

  const getSubmitButton = (): Locator =>
    mainRegion.getByRole(ARIA_ROLE.BUTTON, {
      name: DAMAGE_REPORT_COPY.SUBMIT_BUTTON,
      exact: true,
    });

  return {
    getCauseSelect,
    getDescriptionInput: (): Locator =>
      mainRegion.getByLabel(
        DAMAGE_REPORT_COPY.DESCRIPTION_LABEL
      ),
    getHeading: (): Locator =>
      mainRegion.getByRole(ARIA_ROLE.HEADING, {
        level: HEADING_LEVEL.PAGE,
      }),
    getImpactDeltaInput: (): Locator =>
      mainRegion.getByLabel(
        DAMAGE_REPORT_COPY.IMPACT_DELTA_LABEL
      ),
    getUnitSelect: (): Locator =>
      mainRegion.getByLabel(DAMAGE_REPORT_COPY.UNIT_LABEL),
    getCauseRequiredError: (): Locator =>
      mainRegion.getByText(
        DAMAGE_REPORT_COPY.CAUSE_REQUIRED_ERROR,
        { exact: true }
      ),
    fillDescription: (description: string): Promise<void> =>
      mainRegion
        .getByLabel(DAMAGE_REPORT_COPY.DESCRIPTION_LABEL)
        .fill(description),
    fillImpactDelta: (impactDelta: string): Promise<void> =>
      mainRegion
        .getByLabel(DAMAGE_REPORT_COPY.IMPACT_DELTA_LABEL)
        .fill(impactDelta),
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.OPERATIONS.DAMAGE_REPORT);
    },
    selectCause: (cause: string): Promise<string[]> =>
      getCauseSelect().selectOption(cause),
    submit: (): Promise<void> => getSubmitButton().click(),
  };
};
