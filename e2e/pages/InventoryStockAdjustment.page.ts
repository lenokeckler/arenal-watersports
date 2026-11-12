import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { INVENTORY_COPY } from "@/app/features/operations/inventory/constants/InventoryCopy.constants";
import { INVENTORY_STOCK_ADJUSTMENT_REASON_LABELS } from "@/app/features/operations/inventory/constants/InventoryStockAdjustmentOptions.constants";
import type { InventoryStockAdjustmentPage } from "../models/InventoryStockAdjustmentPage.interface";

const createInventoryStockAdjustmentFields = (
  page: Page
) => {
  const getField = (label: string): Locator =>
    page.getByLabel(label);

  return {
    fillAvailable: (value: string) =>
      getField(INVENTORY_COPY.ADJUSTMENT_AVAILABLE).fill(
        value
      ),
    fillDamaged: (value: string) =>
      getField(INVENTORY_COPY.ADJUSTMENT_DAMAGED).fill(
        value
      ),
    fillInRepair: (value: string) =>
      getField(INVENTORY_COPY.ADJUSTMENT_REPAIR).fill(
        value
      ),
    save: () =>
      page
        .getByRole(ARIA_ROLE.BUTTON, {
          name: INVENTORY_COPY.ADJUSTMENT_SUBMIT,
        })
        .click(),
    selectReason: async (reason: string): Promise<void> => {
      await getField(
        INVENTORY_COPY.ADJUSTMENT_REASON_LABEL
      ).selectOption(reason);
    },
  };
};

const createInventoryStockAdjustmentHistory = (
  page: Page
) => {
  const history = page.getByRole(ARIA_ROLE.REGION, {
    name: INVENTORY_COPY.MOVEMENT_HISTORY_TITLE,
  });

  return {
    getAuthor: (name: string) =>
      history.getByText(
        `${INVENTORY_COPY.MOVEMENT_AUTHOR}: ${name}`,
        { exact: true }
      ),
    getDate: () =>
      history.getByText(INVENTORY_COPY.MOVEMENT_DATE, {
        exact: false,
      }),
    getReason: (reason: string) =>
      history.getByText(
        `${INVENTORY_COPY.MOVEMENT_REASON}: ${INVENTORY_STOCK_ADJUSTMENT_REASON_LABELS[reason]}`,
        { exact: true }
      ),
  };
};

const createInventoryStockAdjustmentFeedback = (
  page: Page
) => ({
  getRequiredReasonError: () =>
    page.getByText(
      INVENTORY_COPY.ADJUSTMENT_REASON_REQUIRED
    ),
  getSuccessMessage: () =>
    page.getByText(INVENTORY_COPY.ADJUSTMENT_SUCCESS, {
      exact: true,
    }),
});

export const createInventoryStockAdjustmentPage = (
  page: Page
): InventoryStockAdjustmentPage => ({
  ...createInventoryStockAdjustmentFields(page),
  ...createInventoryStockAdjustmentHistory(page),
  ...createInventoryStockAdjustmentFeedback(page),
});
