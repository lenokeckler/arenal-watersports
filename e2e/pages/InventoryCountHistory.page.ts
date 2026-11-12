import type { Locator, Page } from "@playwright/test";
import { E2E_INVENTORY_COUNT_HISTORY } from "../constants/E2eInventoryCountHistory.constants";

export const createInventoryCountHistoryPage = (
  page: Page
) => ({
  getDetailDifference: (): Locator =>
    page.getByText(
      E2E_INVENTORY_COUNT_HISTORY.DETAIL_DIFFERENCE
    ),
  getOneDifferenceCount: (): Locator =>
    page
      .getByRole("link")
      .filter({
        hasText: E2E_INVENTORY_COUNT_HISTORY.ONE_DIFFERENCE,
      })
      .first(),
  open: async (): Promise<void> => {
    await page
      .getByRole("link", {
        name: E2E_INVENTORY_COUNT_HISTORY.LINK,
      })
      .click();
    await page
      .getByRole("heading", {
        name: E2E_INVENTORY_COUNT_HISTORY.HEADING,
      })
      .waitFor();
  },
  openFirstDifferentCount: async (): Promise<void> => {
    await page
      .getByRole("link")
      .filter({
        hasText: E2E_INVENTORY_COUNT_HISTORY.ONE_DIFFERENCE,
      })
      .first()
      .click();
  },
});
