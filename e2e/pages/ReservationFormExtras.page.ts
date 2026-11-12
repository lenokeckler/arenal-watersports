import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_FORM_UI_COPY } from "@/app/features/reservations/reservation-form/constants/ReservationFormUiCopy.constants";
import { getMainRegion } from "../support/mainRegion";

export const createReservationFormExtrasPage = (
  page: Page
) => {
  const main = getMainRegion(page);

  return {
    getExtrasHeading: (): Locator =>
      main.getByText(
        RESERVATION_FORM_UI_COPY.EXTRAS_TITLE,
        {
          exact: true,
        }
      ),
    getExtraCheckbox: (name: string): Locator =>
      main.getByRole(ARIA_ROLE.CHECKBOX, {
        name,
        exact: true,
      }),
    getExtraOptionCard: (name: string): Locator =>
      main.getByRole(ARIA_ROLE.GROUP, {
        name,
        exact: true,
      }),
    getQuoteTitle: (): Locator =>
      main.getByText(RESERVATION_FORM_UI_COPY.QUOTE_TITLE, {
        exact: true,
      }),
    getQuoteMissingTariff: (): Locator =>
      main.getByText(
        RESERVATION_FORM_UI_COPY.QUOTE_MISSING_TARIFF,
        { exact: true }
      ),
  };
};
