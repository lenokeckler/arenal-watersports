import { test } from "@playwright/test";
import { THEME } from "@/app/constants";
import { setInventoryScreenshotTheme } from "../support/setInventoryScreenshotTheme";
import {
  E2E_INVENTORY_FIXTURE,
  E2E_INVENTORY_SCREENSHOT,
} from "../constants/E2eInventory.constants";
import { resolveDeviceScreenshotFileName } from "../constants/E2eScreenshot.constants";
import { createInventoryPage } from "../pages/Inventory.page";
import { captureViewport } from "../support/captureViewport";

for (const theme of Object.values(THEME)) {
  test(`captures the inventory overview in ${theme}`, async ({
    page,
  }, testInfo) => {
    await setInventoryScreenshotTheme(page, theme);
    const inventoryPage = createInventoryPage(page);
    await inventoryPage.goTo();
    await inventoryPage
      .getCategoryLink(
        E2E_INVENTORY_FIXTURE.JET_SKI_CATEGORY
      )
      .waitFor();

    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        `${E2E_INVENTORY_SCREENSHOT.OVERVIEW}-${theme}`,
        testInfo.project.name
      )
    );
  });

  test(`captures a unit-tracked category in ${theme}`, async ({
    page,
  }, testInfo) => {
    await setInventoryScreenshotTheme(page, theme);
    const inventoryPage = createInventoryPage(page);
    await inventoryPage.goTo();
    await inventoryPage.goToCategory(
      E2E_INVENTORY_FIXTURE.JET_SKI_CATEGORY
    );
    await inventoryPage
      .getCopy(E2E_INVENTORY_FIXTURE.JET_SKI_UNIT_CODE)
      .waitFor();

    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        `${E2E_INVENTORY_SCREENSHOT.UNIT_CATEGORY}-${theme}`,
        testInfo.project.name
      )
    );
  });

  test(`captures a quantity-tracked category in ${theme}`, async ({
    page,
  }, testInfo) => {
    await setInventoryScreenshotTheme(page, theme);
    const inventoryPage = createInventoryPage(page);
    await inventoryPage.goTo();
    await inventoryPage.goToCategory(
      E2E_INVENTORY_FIXTURE.QUANTITY_CATEGORY
    );
    await inventoryPage
      .getHeading(E2E_INVENTORY_FIXTURE.QUANTITY_CATEGORY)
      .waitFor();

    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        `${E2E_INVENTORY_SCREENSHOT.QUANTITY_CATEGORY}-${theme}`,
        testInfo.project.name
      )
    );
  });
}
