import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "@/app/components/category-catalog/constants/CategoryCatalog.copy";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";

const CATEGORY_CARD_SELECTOR = "div:has(> div > h3)";

export const createCategoryListPage = (page: Page) => {
  const goTo = async (): Promise<void> => {
    await page.goto(PATHS.ADMINISTRATION.CATEGORIES);
  };

  const getHeading = (): Locator =>
    page.getByRole(ARIA_ROLE.HEADING, {
      level: HEADING_LEVEL.PAGE,
      name: CATEGORY_CATALOG_COPY.LIST_TITLE,
    });

  const getCreateCtaButton = (): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.CREATE_CTA,
    });

  const getCategoryCard = (categoryName: string): Locator =>
    page.locator(CATEGORY_CARD_SELECTOR).filter({
      has: page.getByRole(ARIA_ROLE.HEADING, {
        level: HEADING_LEVEL.CARD,
        name: categoryName,
      }),
    });

  const getCategoryDeleteButton = (
    categoryName: string
  ): Locator =>
    getCategoryCard(categoryName).getByRole(
      ARIA_ROLE.BUTTON,
      {
        name: CATEGORY_CATALOG_COPY.DELETE_CATEGORY_BUTTON,
      }
    );

  const getCategoryMarkInactiveButton = (
    categoryName: string
  ): Locator =>
    getCategoryCard(categoryName).getByRole(
      ARIA_ROLE.BUTTON,
      {
        name: CATEGORY_CATALOG_COPY.MARK_INACTIVE_BUTTON,
      }
    );

  const getCategoryGroupMeta = (
    categoryName: string
  ): Locator =>
    getCategoryCard(categoryName).getByText(
      CATEGORY_CATALOG_COPY.GROUP_PREFIX_LABEL
    );

  return {
    goTo,
    getHeading,
    getCreateCtaButton,
    getCategoryCard,
    getCategoryDeleteButton,
    getCategoryMarkInactiveButton,
    getCategoryGroupMeta,
  };
};
