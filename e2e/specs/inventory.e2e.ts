import { expect, test } from "@playwright/test";
import { INVENTORY_UNIT_STATUS } from "@/app/constants";
import { INVENTORY_COPY } from "@/app/features/operations/inventory/constants/InventoryCopy.constants";
import { E2E_INVENTORY_FIXTURE } from "../constants/E2eInventory.constants";
import { createInventoryPage } from "../pages/Inventory.page";
import { createInventoryMetricsPage } from "../pages/InventoryMetrics.page";

test("shows company inventory including jet skis and boats", async ({
  page,
}) => {
  const inventoryPage = createInventoryPage(page);

  await inventoryPage.goTo();

  await expect(
    inventoryPage.getHeading(INVENTORY_COPY.TITLE)
  ).toBeVisible();
  await expect(
    inventoryPage.getCategoryLink(
      E2E_INVENTORY_FIXTURE.JET_SKI_CATEGORY
    )
  ).toBeVisible();
  await expect(
    inventoryPage.getCategoryLink(
      E2E_INVENTORY_FIXTURE.BOAT_CATEGORY
    )
  ).toBeVisible();
});

test("shows codes and statuses for unit-tracked inventory", async ({
  page,
}) => {
  const inventoryPage = createInventoryPage(page);
  await inventoryPage.goTo();
  await inventoryPage.goToCategory(
    E2E_INVENTORY_FIXTURE.JET_SKI_CATEGORY
  );

  await expect(
    inventoryPage.getHeading(
      E2E_INVENTORY_FIXTURE.JET_SKI_CATEGORY
    )
  ).toBeVisible();
  await expect(
    inventoryPage.getCopy(
      E2E_INVENTORY_FIXTURE.JET_SKI_UNIT_CODE
    )
  ).toBeVisible();
  await expect(
    inventoryPage.getUnitStatus(
      E2E_INVENTORY_FIXTURE.JET_SKI_UNIT_CODE,
      INVENTORY_UNIT_STATUS.AVAILABLE
    )
  ).toBeVisible();
});

test("shows totals and condition counts for quantity inventory", async ({
  page,
}) => {
  const inventoryPage = createInventoryPage(page);
  await inventoryPage.goTo();
  await inventoryPage.goToCategory(
    E2E_INVENTORY_FIXTURE.QUANTITY_CATEGORY
  );

  const metrics = createInventoryMetricsPage(page);
  await expect(metrics.getAvailable()).toContainText(
    E2E_INVENTORY_FIXTURE.TOTAL_QUANTITY.toString()
  );
  await expect(metrics.getDamaged()).toContainText(
    E2E_INVENTORY_FIXTURE.DAMAGED_QUANTITY.toString()
  );
  await expect(metrics.getInRepair()).toContainText(
    E2E_INVENTORY_FIXTURE.DAMAGED_QUANTITY.toString()
  );
  await expect(metrics.getTotal()).toContainText(
    E2E_INVENTORY_FIXTURE.TOTAL_QUANTITY.toString()
  );
});
