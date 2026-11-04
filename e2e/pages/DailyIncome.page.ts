import type { Locator, Page } from "@playwright/test";
import {
  ARIA_ROLE,
  CURRENCY_NAME_COPY,
  PATHS,
  type CurrencyCode,
} from "@/app/constants";
import { getMainRegion } from "../support/mainRegion";

export const createDailyIncomePage = (page: Page) => {
  const main = getMainRegion(page);

  const getCurrencyCard = (
    currency: CurrencyCode
  ): Locator =>
    main.getByRole(ARIA_ROLE.REGION, {
      name: CURRENCY_NAME_COPY[currency],
    });

  return {
    getCurrencyCard,
    getMethodRow: (
      currency: CurrencyCode,
      paymentMethod: string
    ): Locator =>
      getCurrencyCard(currency)
        .getByRole(ARIA_ROLE.LISTITEM)
        .filter({ hasText: paymentMethod }),
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.RESERVATIONS.INCOME);
    },
  };
};
