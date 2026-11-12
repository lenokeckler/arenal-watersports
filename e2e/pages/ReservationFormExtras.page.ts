import type { Locator, Page } from "@playwright/test";
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
    getExtraOption: (name: string): Locator =>
      main.getByLabel(name, { exact: false }),
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
