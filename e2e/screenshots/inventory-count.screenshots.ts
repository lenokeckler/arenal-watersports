import { expect, test } from "@playwright/test";
import {
  E2E_INVENTORY_COUNT,
  E2E_INVENTORY_COUNT_SCREENSHOT_BASENAME,
} from "../constants/E2eInventoryCount.constants";
import { createInventoryCountPage } from "../pages/InventoryCount.page";
import { createInventoryPage } from "../pages/Inventory.page";
import { captureFullPage } from "../support/captureFullPage";
import { deleteInventoryCountByNotes } from "../support/deleteInventoryCountByNotes";

test("captures the inventory count form and the recorded count", async ({
  page,
}, testInfo) => {
  const countPage = createInventoryCountPage(page);
  await createInventoryPage(page).goTo();
  await countPage.open();
  await captureFullPage(
    page,
    E2E_INVENTORY_COUNT_SCREENSHOT_BASENAME.FORM,
    testInfo.project.name
  );

  try {
    await countPage.goToSummary();
    await countPage.writeNotes(E2E_INVENTORY_COUNT.NOTES);
    await countPage.submit();
    await expect(
      countPage.getRecordedMessage()
    ).toBeVisible();
    await captureFullPage(
      page,
      E2E_INVENTORY_COUNT_SCREENSHOT_BASENAME.RECORDED,
      testInfo.project.name
    );
  } finally {
    await deleteInventoryCountByNotes(
      E2E_INVENTORY_COUNT.NOTES
    );
  }
});
