import { expect, test } from "@playwright/test";
import { E2E_INVENTORY_COUNT_HISTORY } from "../constants/E2eInventoryCountHistory.constants";
import { createInventoryCountHistoryPage } from "../pages/InventoryCountHistory.page";
import { createInventoryPage } from "../pages/Inventory.page";
import { createInventoryCountHistoryFixture } from "../support/createInventoryCountHistoryFixture";
import { deleteInventoryCountByNotes } from "../support/deleteInventoryCountByNotes";

test("operations reads a past count and what was missing or extra on that date", async ({
  page,
}) => {
  await createInventoryCountHistoryFixture(
    E2E_INVENTORY_COUNT_HISTORY.NOTES,
    E2E_INVENTORY_COUNT_HISTORY.UNIT_CODE
  );
  const historyPage = createInventoryCountHistoryPage(page);

  try {
    await createInventoryPage(page).goTo();
    await historyPage.open();
    await expect(
      historyPage.getOneDifferenceCount()
    ).toBeVisible();

    await historyPage.openFirstDifferentCount();
    await expect(
      historyPage.getDetailDifference()
    ).toBeVisible();
  } finally {
    await deleteInventoryCountByNotes(
      E2E_INVENTORY_COUNT_HISTORY.NOTES
    );
  }
});
