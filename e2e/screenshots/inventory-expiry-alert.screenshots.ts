import { expect, test } from "@playwright/test";
import {
  E2E_INVENTORY_ALERTS,
  E2E_INVENTORY_ALERTS_SCREENSHOT_BASENAME,
} from "../constants/E2eInventoryAlerts.constants";
import { createInventoryAlertsPage } from "../pages/InventoryAlerts.page";
import { createInventoryPage } from "../pages/Inventory.page";
import { buildInventoryExpiryDate } from "../support/buildInventoryExpiryDate";
import { captureFullPage } from "../support/captureFullPage";
import { setCategoryAlertColumn } from "../support/setCategoryAlertColumn";
import { setStockExpiryDate } from "../support/setStockExpiryDate";

test("captures the expiry alert on the inventory", async ({
  page,
}, testInfo) => {
  const previousAnticipation = await setCategoryAlertColumn(
    E2E_INVENTORY_ALERTS.EXPIRY_CATEGORY,
    E2E_INVENTORY_ALERTS.EXPIRY_COLUMN,
    E2E_INVENTORY_ALERTS.EXPIRY_ANTICIPATION_DAYS
  );
  const previousDate = await setStockExpiryDate(
    E2E_INVENTORY_ALERTS.EXPIRY_CATEGORY,
    buildInventoryExpiryDate()
  );

  try {
    await createInventoryPage(page).goTo();
    await expect(
      createInventoryAlertsPage(page).getExpiryAlert()
    ).toBeVisible();
    await captureFullPage(
      page,
      E2E_INVENTORY_ALERTS_SCREENSHOT_BASENAME.EXPIRY,
      testInfo.project.name
    );
  } finally {
    await setStockExpiryDate(
      E2E_INVENTORY_ALERTS.EXPIRY_CATEGORY,
      previousDate
    );
    await setCategoryAlertColumn(
      E2E_INVENTORY_ALERTS.EXPIRY_CATEGORY,
      E2E_INVENTORY_ALERTS.EXPIRY_COLUMN,
      previousAnticipation
    );
  }
});
