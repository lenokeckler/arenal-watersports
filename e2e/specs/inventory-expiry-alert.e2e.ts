import { expect, test } from "@playwright/test";
import { E2E_INVENTORY_ALERTS } from "../constants/E2eInventoryAlerts.constants";
import { createInventoryAlertsPage } from "../pages/InventoryAlerts.page";
import { createInventoryPage } from "../pages/Inventory.page";
import { buildInventoryExpiryDate } from "../support/buildInventoryExpiryDate";
import { setCategoryAlertColumn } from "../support/setCategoryAlertColumn";
import { setStockExpiryDate } from "../support/setStockExpiryDate";

test("operations sees the category that is close to its expiry date", async ({
  page,
}) => {
  const alertsPage = createInventoryAlertsPage(page);
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

    await expect(alertsPage.getExpiryTitle()).toBeVisible();
    await expect(alertsPage.getExpiryAlert()).toBeVisible();
    await expect(
      alertsPage.getExpiryAlertDetail()
    ).toBeVisible();
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
