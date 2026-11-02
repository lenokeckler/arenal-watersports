import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { E2E_RESERVATION_FORM_COPY } from "../constants/E2eReservationForm.constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";
import { getMainRegion } from "../support/mainRegion";

export const createReservationFormHeaderPage = (
  page: Page
) => {
  const main = getMainRegion(page);

  return {
    getBackButton: (): Locator =>
      main.getByRole(ARIA_ROLE.BUTTON, {
        name: E2E_RESERVATION_FORM_COPY.BACK_TO_CALENDAR,
        exact: true,
      }),
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        level: HEADING_LEVEL.PAGE,
      }),
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.RESERVATIONS.NEW);
    },
  };
};
