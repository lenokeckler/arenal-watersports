import { expect, test } from "@playwright/test";
import {
  INVENTORY_TRACKING_MODE,
  THEME,
} from "@/app/constants";
import { INVENTORY_COPY } from "@/app/features/operations/inventory/constants/InventoryCopy.constants";
import { E2E_INVENTORY_CAPTURE } from "../constants/E2eInventoryCapture.constants";
import { E2E_INVENTORY_SCENARIO } from "../constants/E2eInventoryScenario.constants";
import { resolveDeviceScreenshotFileName } from "../constants/E2eScreenshot.constants";
import { createInventoryPage } from "../pages/Inventory.page";
import { createInventoryMetricsPage } from "../pages/InventoryMetrics.page";
import { captureViewport } from "../support/captureViewport";
import { createInventoryCategoryFixture } from "../support/createInventoryCategoryFixture";
import { setInventoryScreenshotTheme } from "../support/setInventoryScreenshotTheme";
import { writeInventoryStockFixture } from "../support/writeInventoryStockFixture";

for (const theme of Object.values(THEME)) {
  test(`captures an empty unit category in ${theme}`, async ({
    page,
  }, testInfo) => {
    const fixture = await createInventoryCategoryFixture(
      INVENTORY_TRACKING_MODE.BY_UNIT,
      E2E_INVENTORY_CAPTURE.EMPTY_CATEGORY
    );
    try {
      await setInventoryScreenshotTheme(page, theme);
      const inventory = createInventoryPage(page);
      await inventory.goToCategoryId(fixture.id);
      await expect(
        inventory.getCopy(INVENTORY_COPY.CATEGORY_EMPTY)
      ).toBeVisible();
      await captureViewport(
        page,
        resolveDeviceScreenshotFileName(
          `${E2E_INVENTORY_CAPTURE.EMPTY}-${theme}`,
          testInfo.project.name
        )
      );
    } finally {
      await fixture.cleanup();
    }
  });
  test(`captures nonzero quantity conditions in ${theme}`, async ({
    page,
  }, testInfo) => {
    const fixture = await createInventoryCategoryFixture(
      INVENTORY_TRACKING_MODE.BY_QUANTITY,
      E2E_INVENTORY_CAPTURE.QUANTITY_CATEGORY
    );
    try {
      await writeInventoryStockFixture(
        fixture,
        E2E_INVENTORY_SCENARIO.STOCK
      );
      await setInventoryScreenshotTheme(page, theme);
      await createInventoryPage(page).goToCategoryId(
        fixture.id
      );
      await expect(
        createInventoryMetricsPage(page).getDamaged()
      ).toContainText(
        E2E_INVENTORY_SCENARIO.STOCK.quantity_damaged.toString()
      );
      await captureViewport(
        page,
        resolveDeviceScreenshotFileName(
          `${E2E_INVENTORY_CAPTURE.QUANTITY}-${theme}`,
          testInfo.project.name
        )
      );
    } finally {
      await fixture.cleanup();
    }
  });
}
