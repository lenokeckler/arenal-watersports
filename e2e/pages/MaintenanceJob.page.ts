import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { MAINTENANCE_JOB_COPY } from "@/app/features/operations/maintenance-job/constants/MaintenanceJobCopy.constants";
import { getMainRegion } from "../support/mainRegion";

export const createMaintenanceJobPage = (page: Page) => {
  const main = getMainRegion(page);

  return {
    getCost: (): Locator =>
      main.getByLabel(
        MAINTENANCE_JOB_COPY.COST_FIELD_LABEL
      ),
    getCurrency: (): Locator =>
      main.getByLabel(
        MAINTENANCE_JOB_COPY.COST_CURRENCY_LABEL
      ),
    getDescription: (): Locator =>
      main.getByLabel(
        MAINTENANCE_JOB_COPY.DESCRIPTION_LABEL
      ),
    getExternal: (): Locator =>
      main.getByLabel(MAINTENANCE_JOB_COPY.EXTERNAL_LABEL),
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        name: MAINTENANCE_JOB_COPY.HEADING,
      }),
    getNextOilChange: (): Locator =>
      main.getByLabel(
        MAINTENANCE_JOB_COPY.NEXT_OIL_CHANGE_LABEL
      ),
    getSubmit: (): Locator =>
      main.getByRole(ARIA_ROLE.BUTTON, {
        name: MAINTENANCE_JOB_COPY.SUBMIT,
      }),
    getUnit: (): Locator =>
      main.getByLabel(MAINTENANCE_JOB_COPY.UNIT_LABEL),
    getWorkType: (): Locator =>
      main.getByLabel(MAINTENANCE_JOB_COPY.WORK_TYPE_LABEL),
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.OPERATIONS.MAINTENANCE_NEW);
    },
  };
};
