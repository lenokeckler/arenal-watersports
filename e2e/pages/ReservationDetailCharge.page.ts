import type { Locator, Page } from "@playwright/test";
import {
  ARIA_ROLE,
  CURRENCY_SYMBOL,
} from "@/app/constants";
import type { CurrencyCode } from "@/app/constants";
import { RESERVATION_DETAIL_CHARGES_COPY as copy } from "@/app/features/reservations/reservation-detail/constants/ReservationDetailChargesCopy.constants";
import { getMainRegion } from "../support/mainRegion";

const SIBLING_AMOUNT = "xpath=following-sibling::*[1]";

export const createReservationDetailChargePage = (
  page: Page
) => {
  const main = getMainRegion(page);
  const getChargeSection = (): Locator =>
    main.getByRole(ARIA_ROLE.REGION, {
      name: copy.CHARGE_STATUS,
    });
  const getChargeLine = (currency: CurrencyCode): Locator =>
    getChargeSection()
      .getByRole(ARIA_ROLE.LISTITEM)
      .filter({ hasText: CURRENCY_SYMBOL[currency] })
      .filter({ hasText: copy.AMOUNT_CHARGED_GROSS });

  return {
    getChargedGross: (currency: CurrencyCode): Locator =>
      getChargeLine(currency)
        .getByText(copy.AMOUNT_CHARGED_GROSS, {
          exact: true,
        })
        .locator(SIBLING_AMOUNT),
    getChargeLine,
    getChargeLink: (code: string): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: copy.RECORD_CHARGE_LABEL(code),
      }),
    getChargeSection,
  };
};
