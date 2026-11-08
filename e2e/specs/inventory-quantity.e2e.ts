import { expect, test, type Page } from "@playwright/test";
import { INVENTORY_TRACKING_MODE } from "@/app/constants";
import { E2E_INVENTORY_SCENARIO } from "../constants/E2eInventoryScenario.constants";
import type { E2eInventoryStock } from "../models/E2eInventoryStock.type";
import { createInventoryPage } from "../pages/Inventory.page";
import { createInventoryMetricsPage } from "../pages/InventoryMetrics.page";
import { createInventoryCategoryFixture } from "../support/createInventoryCategoryFixture";
import { writeInventoryStockFixture } from "../support/writeInventoryStockFixture";

const expectStockCounts = async (
  page: Page,
  stock: E2eInventoryStock
): Promise<void> => {
  const metrics = createInventoryMetricsPage(page);
  const total =
    stock.quantity_available +
    stock.quantity_damaged +
    stock.quantity_in_repair;
  await expect(metrics.getAvailable()).toContainText(
    stock.quantity_available.toString()
  );
  await expect(metrics.getDamaged()).toContainText(
    stock.quantity_damaged.toString()
  );
  await expect(metrics.getInRepair()).toContainText(
    stock.quantity_in_repair.toString()
  );
  await expect(metrics.getTotal()).toContainText(
    total.toString()
  );
};
test("shows distinct quantity counts and live changes without reload", async ({
  page,
}) => {
  const fixture = await createInventoryCategoryFixture(
    INVENTORY_TRACKING_MODE.BY_QUANTITY
  );
  try {
    await writeInventoryStockFixture(
      fixture,
      E2E_INVENTORY_SCENARIO.STOCK
    );
    await createInventoryPage(page).goToCategoryId(
      fixture.id
    );
    await expectStockCounts(
      page,
      E2E_INVENTORY_SCENARIO.STOCK
    );
    await writeInventoryStockFixture(
      fixture,
      E2E_INVENTORY_SCENARIO.STOCK_UPDATED
    );
    await expectStockCounts(
      page,
      E2E_INVENTORY_SCENARIO.STOCK_UPDATED
    );
  } finally {
    await fixture.cleanup();
  }
});
