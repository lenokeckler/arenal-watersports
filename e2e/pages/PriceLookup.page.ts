import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { PRICE_LOOKUP_COPY } from "@/app/features/operations/price-lookup/constants/PriceLookupCopy.constants";
import { getMainRegion } from "../support/mainRegion";

export const createPriceLookupPage = (page: Page) => {
  const main = getMainRegion(page);

  const getSection = (name: string): Locator =>
    main.getByRole(ARIA_ROLE.REGION, { name, exact: true });

  return {
    getAlert: (): Locator =>
      main.getByRole(ARIA_ROLE.ALERT),
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        name: PRICE_LOOKUP_COPY.HEADING,
        exact: true,
      }),
    getInteractiveElements: (): Locator =>
      main
        .getByRole(ARIA_ROLE.BUTTON)
        .or(main.getByRole(ARIA_ROLE.LINK))
        .or(main.getByRole(ARIA_ROLE.TEXTBOX)),
    getMain: (): Locator => main,
    getRow: (section: Locator, text: string): Locator =>
      section
        .getByRole(ARIA_ROLE.LISTITEM)
        .filter({ hasText: text }),
    getGroup: (section: Locator, name: string): Locator =>
      section.getByRole(ARIA_ROLE.LIST, {
        name,
        exact: true,
      }),
    getSection,
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.OPERATIONS.PRICE_LOOKUP);
    },
  };
};
