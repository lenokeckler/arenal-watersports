import type { Locator, Page } from "@playwright/test";
import {
  ARIA_ROLE,
  DAMAGE_CAUSE_LABELS,
} from "@/app/constants";
import { DAMAGE_REPORT_COPY } from "@/app/features/operations/damage-report/constants/DamageReportCopy.constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";
import { getMainRegion } from "../support/mainRegion";

export const createDamageReportLocators = (page: Page) => {
  const main = getMainRegion(page);

  return {
    getCause: (
      cause: keyof typeof DAMAGE_CAUSE_LABELS
    ): Locator =>
      main.getByRole(ARIA_ROLE.RADIO, {
        name: DAMAGE_CAUSE_LABELS[cause],
      }),
    getCauseRequiredError: (): Locator =>
      main.getByText(
        DAMAGE_REPORT_COPY.CAUSE_REQUIRED_ERROR,
        { exact: true }
      ),
    getDescriptionInput: (): Locator =>
      main.getByLabel(DAMAGE_REPORT_COPY.DESCRIPTION_LABEL),
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        level: HEADING_LEVEL.PAGE,
      }),
    getHits: (): Locator =>
      main.getByRole(ARIA_ROLE.GROUP, {
        name: DAMAGE_REPORT_COPY.HITS_LABEL,
      }),
    getUnitSelect: (): Locator =>
      main.getByLabel(DAMAGE_REPORT_COPY.UNIT_LABEL),
  };
};
