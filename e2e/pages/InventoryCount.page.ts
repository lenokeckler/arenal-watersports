import type { Locator, Page } from "@playwright/test";
import { INVENTORY_COUNT_COPY } from "@/app/features/operations/inventory-count/constants/InventoryCountCopy.constants";
import { E2E_INVENTORY_COUNT } from "../constants/E2eInventoryCount.constants";

export const createInventoryCountPage = (page: Page) => ({
  getRecordedMessage: (): Locator =>
    page.getByText(E2E_INVENTORY_COUNT.RECORDED_MESSAGE),
  goToSummary: async (): Promise<void> => {
    const next = page.getByRole("button", {
      name: INVENTORY_COUNT_COPY.NEXT,
    });

    while (await next.isVisible()) {
      await next.click();
    }
  },
  open: async (): Promise<void> => {
    await page
      .getByRole("link", { name: E2E_INVENTORY_COUNT.LINK })
      .click();
    await page
      .getByRole("heading", {
        name: E2E_INVENTORY_COUNT.HEADING,
      })
      .waitFor();
  },
  submit: async (): Promise<void> => {
    await page
      .getByRole("button", {
        name: E2E_INVENTORY_COUNT.SUBMIT,
      })
      .click();
  },
  writeNotes: async (notes: string): Promise<void> => {
    await page.getByLabel(/Notas del conteo/).fill(notes);
  },
});
