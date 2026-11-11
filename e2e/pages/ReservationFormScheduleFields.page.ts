import type { Locator, Page } from "@playwright/test";
import { E2E_RESERVATION_FORM_COPY } from "../constants/E2eReservationForm.constants";
import { getMainRegion } from "../support/mainRegion";

export const createReservationFormScheduleFieldsPage = (
  page: Page
) => {
  const main = getMainRegion(page);

  return {
    getDateInput: (): Locator =>
      main.getByLabel(E2E_RESERVATION_FORM_COPY.DATE, {
        exact: false,
      }),
    getTimeInput: (): Locator =>
      main.getByLabel(E2E_RESERVATION_FORM_COPY.TIME, {
        exact: false,
      }),
    getTimeZoneHint: (): Locator =>
      main.getByText(E2E_RESERVATION_FORM_COPY.TIME_ZONE, {
        exact: true,
      }),
  };
};
