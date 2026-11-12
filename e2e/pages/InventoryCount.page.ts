import type { Locator, Page } from "@playwright/test";
import { INVENTORY_COUNT_COPY } from "@/app/features/operations/inventory-count/constants/InventoryCountCopy.constants";
import { E2E_INVENTORY_COUNT } from "../constants/E2eInventoryCount.constants";

export const createInventoryCountPage = (page: Page) => ({
  getRecordedMessage: (): Locator =>
    page.getByText(E2E_INVENTORY_COUNT.RECORDED_MESSAGE),
  confirmAllCategories: async (): Promise<void> => {
    const register = page.getByRole("button", {
      name: INVENTORY_COUNT_COPY.SUBMIT,
    });
    const confirm = page.getByRole("button", {
      name: INVENTORY_COUNT_COPY.CONFIRM_CATEGORY,
    });
    const matchAll = page.getByRole("button", {
      name: INVENTORY_COUNT_COPY.MATCH_ALL,
    });

    while (await register.isDisabled()) {
      if (!(await confirm.isVisible())) {
        await page
          .getByRole("list", {
            name: INVENTORY_COUNT_COPY.CATEGORIES_LABEL,
          })
          .getByRole("button")
          .filter({
            hasText: INVENTORY_COUNT_COPY.CATEGORY_PENDING,
          })
          .first()
          .click();
      }

      if (await matchAll.isVisible()) {
        await matchAll.click();
      } else {
        await confirm.click();
      }
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
