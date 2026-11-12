import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { LIST_PAGINATION_COPY } from "@/app/components/list-pagination/constants/ListPaginationCopy.constants";
import { CATEGORY_CATALOG_COPY } from "@/app/features/administration/category-catalog/constants/CategoryCatalogCopy.constants";
import { LIST_PAGINATION } from "@/app/utils/list-pagination/constants/ListPagination.constants";
import { resolveListPageHref } from "@/app/utils/list-pagination/resolveListPageHref";
import {
  E2E_COUNT,
  HEADING_LEVEL,
} from "../constants/E2eRuntime.constants";
import { createCategoryCardOptionsPage } from "./CategoryCardOptions.page";

export const createCategoryListPage = (page: Page) => {
  const categoryCardOptionsPage =
    createCategoryCardOptionsPage();

  const goToPage = async (
    pageNumber: number
  ): Promise<void> => {
    await page.goto(
      resolveListPageHref(
        PATHS.ADMINISTRATION.CATEGORIES,
        pageNumber
      )
    );
  };

  const goTo = async (): Promise<void> => {
    await goToPage(LIST_PAGINATION.FIRST_PAGE);
  };

  const getHeading = (): Locator =>
    page.getByRole(ARIA_ROLE.HEADING, {
      level: HEADING_LEVEL.PAGE,
      name: CATEGORY_CATALOG_COPY.LIST_TITLE,
    });

  const getCategoryCard = (categoryName: string): Locator =>
    page.getByRole(ARIA_ROLE.GROUP).filter({
      has: page.getByRole(ARIA_ROLE.HEADING, {
        level: HEADING_LEVEL.CARD,
        name: categoryName,
      }),
    });

  const getNextPageLink = (): Locator =>
    page.getByRole(ARIA_ROLE.LINK, {
      name: LIST_PAGINATION_COPY.NEXT,
    });

  const goToCategory = async (
    categoryName: string
  ): Promise<void> => {
    let pageNumber = LIST_PAGINATION.FIRST_PAGE;

    await goToPage(pageNumber);
    await getHeading().waitFor();

    while (
      (await getCategoryCard(categoryName).count()) ===
        E2E_COUNT.NONE &&
      (await getNextPageLink().count()) > E2E_COUNT.NONE
    ) {
      pageNumber += 1;
      await goToPage(pageNumber);
      await getHeading().waitFor();
    }
  };

  const openCategoryOptions = async (
    categoryName: string
  ): Promise<void> => {
    await categoryCardOptionsPage.openOptions(
      getCategoryCard(categoryName)
    );
  };

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

  const getCategoryStatusChip = (
    categoryName: string,
    statusLabel: string
  ): Locator =>
    getCategoryCard(categoryName).getByText(statusLabel, {
      exact: true,
    });

  const getCategoryInactiveChip = (
    categoryName: string
  ): Locator =>
    getCategoryStatusChip(
      categoryName,
      CATEGORY_CATALOG_COPY.STATUS_LABEL_INACTIVE
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
    await openCategoryOptions(categoryName);
    await getCategoryDeleteButton(categoryName).click();
  };

  const clickCategoryMarkInactiveButton = async (
    categoryName: string
  ): Promise<void> => {
    await openCategoryOptions(categoryName);
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
    goToCategory,
    getHeading,
    getCategoryCard,
    openCategoryOptions,
    getCategoryGroupMeta,
    getCategoryDeleteButton,
    getCategoryMarkInactiveButton,
    getCategoryStatusChip,
    getCategoryInactiveChip,
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
