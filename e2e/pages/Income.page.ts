import type { Locator, Page } from "@playwright/test";
import {
  ARIA_ROLE,
  CURRENCY_NAME_COPY,
  PATHS,
  type CurrencyCode,
} from "@/app/constants";
import { INCOME_COPY } from "@/app/features/administration/income/constants/IncomeCopy.constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";
import { getMainRegion } from "../support/mainRegion";

export const createIncomePage = (page: Page) => {
  const main = getMainRegion(page);

  const getCurrencyCard = (
    currency: CurrencyCode
  ): Locator =>
    main.getByRole(ARIA_ROLE.REGION, {
      name: CURRENCY_NAME_COPY[currency],
    });

  return {
    getCurrencyCard,
    getFigure: (
      currency: CurrencyCode,
      label: string
    ): Locator =>
      getCurrencyCard(currency)
        .getByText(label, { exact: true })
        .locator("xpath=following-sibling::dd[1]"),
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        level: HEADING_LEVEL.PAGE,
        name: INCOME_COPY.PAGE_TITLE,
      }),
    getNegativeNote: (currency: CurrencyCode): Locator =>
      getCurrencyCard(currency).getByText(
        INCOME_COPY.NET_NEGATIVE_NOTE
      ),
    getPageTitle: (): Locator =>
      page.getByRole(ARIA_ROLE.HEADING, {
        name: INCOME_COPY.PAGE_TITLE,
      }),
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.ADMINISTRATION.INCOME);
    },
  };
};
