import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { UNIT_CORRECTION_COPY } from "@/app/features/operations/unit-readings/constants/UnitCorrectionCopy.constants";
import { UNIT_READINGS_COPY } from "@/app/features/operations/unit-readings/constants/UnitReadingsCopy.constants";
import { getMainRegion } from "../support/mainRegion";

export const createUnitReadingsPage = (page: Page) => {
  const main = getMainRegion(page);

  return {
    getCard: (unitCode: string): Locator =>
      main
        .getByRole(ARIA_ROLE.LISTITEM)
        .filter({ hasText: unitCode }),
    getCorrectionHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        name: UNIT_CORRECTION_COPY.HEADING,
        exact: true,
      }),
    getFuelLevel: (): Locator =>
      main.getByLabel(
        UNIT_CORRECTION_COPY.FUEL_LEVEL_LABEL
      ),
    getFuelMax: (): Locator =>
      main.getByLabel(UNIT_CORRECTION_COPY.FUEL_MAX_LABEL),
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        name: UNIT_READINGS_COPY.HEADING,
        exact: true,
      }),
    getImpacts: (): Locator =>
      main.getByLabel(UNIT_CORRECTION_COPY.IMPACTS_LABEL),
    getStatus: (): Locator =>
      main.getByLabel(UNIT_CORRECTION_COPY.STATUS_LABEL),
    getSubmit: (): Locator =>
      main.getByRole(ARIA_ROLE.BUTTON, {
        name: UNIT_CORRECTION_COPY.SUBMIT,
      }),
    getUsage: (): Locator =>
      main.getByLabel(
        UNIT_CORRECTION_COPY.USAGE_LABEL.engine_hours
      ),
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.OPERATIONS.UNIT_READINGS);
    },
    openCorrection: async (
      unitCode: string
    ): Promise<void> => {
      await main
        .getByRole(ARIA_ROLE.LISTITEM)
        .filter({ hasText: unitCode })
        .getByRole("link", {
          name: UNIT_READINGS_COPY.CORRECT,
        })
        .click();
    },
  };
};
