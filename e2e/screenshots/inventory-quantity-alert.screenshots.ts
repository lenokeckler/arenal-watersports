import { expect, test } from "@playwright/test";
import {
  E2E_INVENTORY_ALERTS,
  E2E_INVENTORY_ALERTS_SCREENSHOT_BASENAME,
} from "../constants/E2eInventoryAlerts.constants";
import { createInventoryAlertsPage } from "../pages/InventoryAlerts.page";
import { createInventoryPage } from "../pages/Inventory.page";
import { captureFullPage } from "../support/captureFullPage";
import { setCategoryAlertColumn } from "../support/setCategoryAlertColumn";

test("captures the quantity alert on the inventory", async ({
  page,
}, testInfo) => {
  const previous = await setCategoryAlertColumn(
    E2E_INVENTORY_ALERTS.CATEGORY,
    E2E_INVENTORY_ALERTS.MINIMUM_COLUMN,
    E2E_INVENTORY_ALERTS.MINIMUM
  );

  try {
    await createInventoryPage(page).goTo();
    await expect(
      createInventoryAlertsPage(page).getQuantityAlert()
    ).toBeVisible();
    await captureFullPage(
      page,
      E2E_INVENTORY_ALERTS_SCREENSHOT_BASENAME.QUANTITY,
      testInfo.project.name
    );
  } finally {
    await setCategoryAlertColumn(
      E2E_INVENTORY_ALERTS.CATEGORY,
      E2E_INVENTORY_ALERTS.MINIMUM_COLUMN,
      previous
    );
  }
});
