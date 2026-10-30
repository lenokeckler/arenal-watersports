import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "@/app/components/category-catalog/constants/CategoryCatalogCopy.constants";
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

  const getCategoryCard = (categoryName: string): Locator =>
    page.locator(CATEGORY_CARD_SELECTOR).filter({
      has: page.getByRole(ARIA_ROLE.HEADING, {
        level: HEADING_LEVEL.CARD,
        name: categoryName,
      }),
    });

  const getCategoryGroupMeta = (
    categoryName: string
  ): Locator =>
    getCategoryCard(categoryName).getByText(
      CATEGORY_CATALOG_COPY.GROUP_PREFIX_LABEL
    );

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

  const getCategoryInactivePill = (
    categoryName: string
  ): Locator =>
    getCategoryCard(categoryName).getByText(
      CATEGORY_CATALOG_COPY.STATUS_PILL_INACTIVE
    );

  const getCategoryCancelButton = (
    categoryName: string
  ): Locator =>
    getCategoryCard(categoryName).getByRole(
      ARIA_ROLE.BUTTON,
      { name: CATEGORY_CATALOG_COPY.CANCEL_BUTTON }
    );

  const getCategoryConfirmDeleteButton = (
    categoryName: string
  ): Locator =>
    getCategoryCard(categoryName).getByRole(
      ARIA_ROLE.BUTTON,
      { name: CATEGORY_CATALOG_COPY.DELETE_BUTTON }
    );

  const getCategoryConfirmDeleteMessage = (
    categoryName: string
  ): Locator =>
    getCategoryCard(categoryName).getByText(
      CATEGORY_CATALOG_COPY.DELETE_CONFIRM_MESSAGE
    );

  const getCreateLink = (): Locator =>
    page.getByRole(ARIA_ROLE.LINK, {
      name: CATEGORY_CATALOG_COPY.CREATE_CTA,
    });

  const getToastMessage = (message: string): Locator =>
    page.getByText(message);

  const clickCreateLink = async (): Promise<void> => {
    await getCreateLink().click();
  };

  const clickCategoryDeleteButton = async (
    categoryName: string
  ): Promise<void> => {
    await getCategoryDeleteButton(categoryName).click();
  };

  const clickCategoryMarkInactiveButton = async (
    categoryName: string
  ): Promise<void> => {
    await getCategoryMarkInactiveButton(
      categoryName
    ).click();
  };

  const clickCategoryCancelButton = async (
    categoryName: string
  ): Promise<void> => {
    await getCategoryCancelButton(categoryName).click();
  };

  const clickCategoryConfirmDeleteButton = async (
    categoryName: string
  ): Promise<void> => {
    await getCategoryConfirmDeleteButton(
      categoryName
    ).click();
  };

  return {
    goTo,
    getHeading,
    getCategoryCard,
    getCategoryGroupMeta,
    getCategoryDeleteButton,
    getCategoryMarkInactiveButton,
    getCategoryInactivePill,
    getCategoryCancelButton,
    getCategoryConfirmDeleteButton,
    getCategoryConfirmDeleteMessage,
    getCreateLink,
    getToastMessage,
    clickCreateLink,
    clickCategoryDeleteButton,
    clickCategoryMarkInactiveButton,
    clickCategoryCancelButton,
    clickCategoryConfirmDeleteButton,
  };
};
