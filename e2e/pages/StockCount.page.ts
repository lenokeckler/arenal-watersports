import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, STRING } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "@/app/features/administration/category-catalog/constants/CategoryCatalogCopy.constants";
import type { StockAdjustmentReason } from "@/app/features/administration/stock-catalog/constants/StockAdjustmentReason.constants";
import { STOCK_COUNT_COPY } from "@/app/features/administration/stock-catalog/constants/StockCountCopy.constants";
import { STOCK_REASON_COPY } from "@/app/features/administration/stock-catalog/constants/StockReasonCopy.constants";
import { resolveCategoryStockPath } from "@/app/features/administration/stock-catalog/utils/resolveStockPaths";
import { formatStockValueChange } from "@/app/features/administration/stock-catalog/utils/formatStockValueChange";
import { formatStockTransition } from "@/app/features/administration/stock-catalog/utils/formatStockTransition";
import { E2E_NEXT_NOT_FOUND_MESSAGE } from "../constants/E2eCategoryBehavior.constants";
import {
  E2E_PARENT_SELECTOR,
  E2E_STOCK_HISTORY_INDEX,
} from "../constants/E2eStockCount.constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";
import { createCategoryCardOptionsPage } from "./CategoryCardOptions.page";

export const createStockCountPage = (page: Page) => {
  const categoryCardOptionsPage =
    createCategoryCardOptionsPage();

  const goTo = async (
    categoryId: string
  ): Promise<void> => {
    await page.goto(resolveCategoryStockPath(categoryId));
  };

  const getStockLink = (categoryCard: Locator): Locator =>
    categoryCard.getByRole(ARIA_ROLE.LINK, {
      name: CATEGORY_CATALOG_COPY.STOCK_LINK,
    });

  const clickStockLink = async (
    categoryCard: Locator
  ): Promise<void> => {
    await categoryCardOptionsPage.openOptions(categoryCard);
    await getStockLink(categoryCard).click();
  };

  const getHeading = (categoryName: string): Locator =>
    page.getByRole(ARIA_ROLE.HEADING, {
      level: HEADING_LEVEL.PAGE,
      name: [
        STOCK_COUNT_COPY.TITLE_PREFIX,
        categoryName,
      ].join(STRING.SPACE),
    });

  const getField = (label: string): Locator =>
    page.getByLabel(label);

  const getQuantityInput = (label: string): Locator =>
    page.getByRole(ARIA_ROLE.TEXTBOX, {
      exact: true,
      name: label,
    });

  const fillQuantity = async (
    label: string,
    quantity: string
  ): Promise<void> => {
    await getQuantityInput(label).fill(quantity);
  };

  const selectReason = async (
    reason: StockAdjustmentReason
  ): Promise<void> => {
    await getField(
      STOCK_COUNT_COPY.REASON_LABEL
    ).selectOption(reason);
  };

  const getReasonSelect = (): Locator =>
    getField(STOCK_COUNT_COPY.REASON_LABEL);

  const getTotal = (): Locator =>
    page
      .getByText(STOCK_COUNT_COPY.TOTAL_REGISTERED_LABEL, {
        exact: true,
      })
      .locator(E2E_PARENT_SELECTOR);

  const save = async (): Promise<void> => {
    await page
      .getByRole(ARIA_ROLE.BUTTON, {
        name: STOCK_COUNT_COPY.SAVE_BUTTON,
      })
      .click();
  };

  const getToastMessage = (message: string): Locator =>
    page.getByText(message);

  const getHistoryRows = (): Locator =>
    page.getByRole(ARIA_ROLE.GROUP).filter({
      hasText: STOCK_COUNT_COPY.MOVEMENT_TOTAL_LABEL,
    });

  const getNewestHistoryRow = (): Locator =>
    getHistoryRows().nth(E2E_STOCK_HISTORY_INDEX.NEWEST);

  const getRowReason = (
    row: Locator,
    reason: StockAdjustmentReason
  ): Locator => row.getByText(STOCK_REASON_COPY[reason]);

  const getRowTransition = (
    row: Locator,
    label: string,
    from: number,
    to: number
  ): Locator =>
    row.getByText(formatStockTransition(label, from, to));

  const getRowTotal = (
    row: Locator,
    from: number,
    to: number
  ): Locator =>
    row.getByText(
      [
        STOCK_COUNT_COPY.MOVEMENT_TOTAL_LABEL,
        formatStockValueChange(from, to),
      ].join(STRING.SPACE)
    );

  const getNotFoundMessage = (): Locator =>
    page.getByText(E2E_NEXT_NOT_FOUND_MESSAGE);

  return {
    clickStockLink,
    fillQuantity,
    getField,
    getHeading,
    getHistoryRows,
    getNewestHistoryRow,
    getNotFoundMessage,
    getReasonSelect,
    getRowReason,
    getRowTotal,
    getRowTransition,
    getStockLink,
    getToastMessage,
    getTotal,
    goTo,
    save,
    selectReason,
  };
};
