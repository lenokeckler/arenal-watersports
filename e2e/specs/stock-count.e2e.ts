import { expect, test } from "@playwright/test";
import { STOCK_ADJUSTMENT_REASON } from "@/app/features/administration/stock-catalog/constants/StockAdjustmentReason.constants";
import { STOCK_COUNT_COPY } from "@/app/features/administration/stock-catalog/constants/StockCountCopy.constants";
import { E2E_BY_QUANTITY_CATEGORY } from "../constants/E2eCategoryUnits.constants";
import {
  E2E_STOCK_AFTER_DISCARD,
  E2E_STOCK_AVAILABLE,
  E2E_STOCK_COUNT_SCENARIO,
  E2E_STOCK_HIDDEN_ROW_COUNT,
  E2E_STOCK_HISTORY_ROWS,
  E2E_STOCK_INITIAL_COUNT,
  E2E_STOCK_TOTALS,
  E2E_STOCK_UNCHANGED,
  resolveStockCountFixtureName,
} from "../constants/E2eStockCount.constants";
import { createCategoryListPage } from "../pages/CategoryList.page";
import { createStockCountPage } from "../pages/StockCount.page";
import { seedCategoryWithBehavior } from "../support/categoryFixtures";
import { logInAsAdmin } from "../support/logInAsAdmin";
import { removeCategoryWithStock } from "../support/stockFixtures";

test.describe("Stock count", () => {
  test("registers a count, discards one and shows both in the history from to", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveStockCountFixtureName(
      testInfo.project.name,
      E2E_STOCK_COUNT_SCENARIO
    );
    await seedCategoryWithBehavior(
      categoryName,
      E2E_BY_QUANTITY_CATEGORY
    );
    const categoryListPage = createCategoryListPage(page);
    const stockCountPage = createStockCountPage(page);

    try {
      await logInAsAdmin(page);
      await categoryListPage.goToCategory(categoryName);
      await stockCountPage.clickStockLink(
        categoryListPage.getCategoryCard(categoryName)
      );

      await expect(
        stockCountPage.getHeading(categoryName)
      ).toBeVisible();
      await expect(
        stockCountPage.getReasonSelect()
      ).toHaveValue(E2E_STOCK_INITIAL_COUNT.reason);

      await stockCountPage.fillQuantity(
        STOCK_COUNT_COPY.AVAILABLE_LABEL,
        E2E_STOCK_INITIAL_COUNT.available
      );
      await stockCountPage.fillQuantity(
        STOCK_COUNT_COPY.DAMAGED_LABEL,
        E2E_STOCK_INITIAL_COUNT.damaged
      );
      await stockCountPage.fillQuantity(
        STOCK_COUNT_COPY.IN_REPAIR_LABEL,
        E2E_STOCK_INITIAL_COUNT.inRepair
      );
      await expect(stockCountPage.getTotal()).toContainText(
        `${E2E_STOCK_TOTALS.AFTER_INITIAL_COUNT}`
      );
      await stockCountPage.save();

      await expect(
        stockCountPage.getToastMessage(
          STOCK_COUNT_COPY.SAVE_SUCCESS_TOAST
        )
      ).toBeVisible();
      const initialRow =
        stockCountPage.getNewestHistoryRow();
      await expect(
        stockCountPage.getRowReason(
          initialRow,
          STOCK_ADJUSTMENT_REASON.INITIAL_COUNT
        )
      ).toBeVisible();
      await expect(
        stockCountPage.getRowTotal(
          initialRow,
          E2E_STOCK_TOTALS.BEFORE_INITIAL_COUNT,
          E2E_STOCK_TOTALS.AFTER_INITIAL_COUNT
        )
      ).toBeVisible();

      await stockCountPage.fillQuantity(
        STOCK_COUNT_COPY.AVAILABLE_LABEL,
        E2E_STOCK_AFTER_DISCARD.available
      );
      await stockCountPage.selectReason(
        E2E_STOCK_AFTER_DISCARD.reason
      );
      await stockCountPage.save();

      await expect(
        stockCountPage.getHistoryRows()
      ).toHaveCount(E2E_STOCK_HISTORY_ROWS.AFTER_DISCARD);
      const discardRow =
        stockCountPage.getNewestHistoryRow();
      await expect(
        stockCountPage.getRowReason(
          discardRow,
          STOCK_ADJUSTMENT_REASON.DISCARDED
        )
      ).toBeVisible();
      await expect(
        stockCountPage.getRowTransition(
          discardRow,
          STOCK_COUNT_COPY.AVAILABLE_LABEL,
          E2E_STOCK_AVAILABLE.AFTER_INITIAL_COUNT,
          E2E_STOCK_AVAILABLE.AFTER_DISCARD
        )
      ).toBeVisible();
      await expect(
        stockCountPage.getRowTransition(
          discardRow,
          STOCK_COUNT_COPY.DAMAGED_LABEL,
          E2E_STOCK_UNCHANGED.DAMAGED,
          E2E_STOCK_UNCHANGED.DAMAGED
        )
      ).toHaveCount(E2E_STOCK_HIDDEN_ROW_COUNT);
      await expect(
        stockCountPage.getRowTotal(
          discardRow,
          E2E_STOCK_TOTALS.AFTER_INITIAL_COUNT,
          E2E_STOCK_TOTALS.AFTER_DISCARD
        )
      ).toBeVisible();
    } finally {
      await removeCategoryWithStock(categoryName);
    }
  });
});
