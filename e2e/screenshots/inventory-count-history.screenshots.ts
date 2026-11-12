import { expect, test } from "@playwright/test";
import {
  E2E_INVENTORY_COUNT_HISTORY,
  E2E_INVENTORY_COUNT_HISTORY_SCREENSHOT_BASENAME,
} from "../constants/E2eInventoryCountHistory.constants";
import { createInventoryCountHistoryPage } from "../pages/InventoryCountHistory.page";
import { createInventoryPage } from "../pages/Inventory.page";
import { captureFullPage } from "../support/captureFullPage";
import { createInventoryCountHistoryFixture } from "../support/createInventoryCountHistoryFixture";
import { deleteInventoryCountByNotes } from "../support/deleteInventoryCountByNotes";

test("captures the count history and the detail of a count", async ({
  page,
}, testInfo) => {
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
    await captureFullPage(
      page,
      E2E_INVENTORY_COUNT_HISTORY_SCREENSHOT_BASENAME.LIST,
      testInfo.project.name
    );

    await historyPage.openFirstDifferentCount();
    await expect(
      historyPage.getDetailDifference()
    ).toBeVisible();
    await captureFullPage(
      page,
      E2E_INVENTORY_COUNT_HISTORY_SCREENSHOT_BASENAME.DETAIL,
      testInfo.project.name
    );
  } finally {
    await deleteInventoryCountByNotes(
      E2E_INVENTORY_COUNT_HISTORY.NOTES
    );
  }
});
