import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";
import { E2E_WORKER_AREAS_COPY } from "../constants/E2eWorkerAreas.constants";
import { getMainRegion } from "../support/mainRegion";

export const createWorkerAreasPage = (page: Page) => {
  const main = getMainRegion(page);
  const locators = {
    getAreaRow: (areaLabel: string): Locator =>
      main
        .getByText(areaLabel, { exact: true })
        .locator("xpath=../.."),
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        level: HEADING_LEVEL.PAGE,
      }),
    getMessage: (message: string): Locator =>
      main.getByText(message, { exact: true }),
    getNotice: (message: string): Locator =>
      main
        .getByRole(ARIA_ROLE.STATUS)
        .filter({ hasText: message }),
    getSearchButton: (): Locator =>
      main.getByRole(ARIA_ROLE.BUTTON, {
        name: E2E_WORKER_AREAS_COPY.SEARCH,
      }),
    getReservationsReportLink: (): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: E2E_WORKER_AREAS_COPY.RESERVATIONS_REPORT,
      }),
    getUsernameInput: (): Locator =>
      main.getByLabel(
        E2E_WORKER_AREAS_COPY.USERNAME_LABEL,
        {
          exact: true,
        }
      ),
  };

  return {
    ...locators,
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.ADMINISTRATION.WORKER_AREAS);
    },
    press: (
      areaLabel: string,
      buttonLabel: string
    ): Promise<void> =>
      locators
        .getAreaRow(areaLabel)
        .getByRole(ARIA_ROLE.BUTTON, { name: buttonLabel })
        .click(),
    search: async (username: string): Promise<void> => {
      await locators.getUsernameInput().fill(username);
      await locators.getSearchButton().click();
    },
  };
};
