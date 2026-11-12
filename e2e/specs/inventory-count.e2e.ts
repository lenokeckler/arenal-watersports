import { expect, test } from "@playwright/test";
import { E2E_INVENTORY_COUNT } from "../constants/E2eInventoryCount.constants";
import { createInventoryCountPage } from "../pages/InventoryCount.page";
import { createInventoryPage } from "../pages/Inventory.page";
import { deleteInventoryCountByNotes } from "../support/deleteInventoryCountByNotes";
import { readInventoryCountByNotes } from "../support/readInventoryCountByNotes";

test("operations records an inventory count with notes from the inventory", async ({
  page,
}) => {
  const inventoryPage = createInventoryPage(page);
  const countPage = createInventoryCountPage(page);
  await inventoryPage.goTo();
  await countPage.open();

  try {
    await countPage.confirmAllCategories();
    await countPage.writeNotes(E2E_INVENTORY_COUNT.NOTES);
    await countPage.submit();

    await expect(
      countPage.getRecordedMessage()
    ).toBeVisible();

    const record = await readInventoryCountByNotes(
      E2E_INVENTORY_COUNT.NOTES
    );
    expect(record.confirmedUnitLines).toBeGreaterThan(0);
    expect(record.quantityLines).toBeGreaterThan(0);
  } finally {
    await deleteInventoryCountByNotes(
      E2E_INVENTORY_COUNT.NOTES
    );
  }
});
