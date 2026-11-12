import { expect, test } from "@playwright/test";
import { E2E_INVENTORY_ALERTS } from "../constants/E2eInventoryAlerts.constants";
import { createInventoryAlertsPage } from "../pages/InventoryAlerts.page";
import { createInventoryPage } from "../pages/Inventory.page";
import { setCategoryAlertColumn } from "../support/setCategoryAlertColumn";

test("operations sees the category that fell under its minimum quantity", async ({
  page,
}) => {
  const alertsPage = createInventoryAlertsPage(page);
  const previous = await setCategoryAlertColumn(
    E2E_INVENTORY_ALERTS.CATEGORY,
    E2E_INVENTORY_ALERTS.MINIMUM_COLUMN,
    E2E_INVENTORY_ALERTS.MINIMUM
  );

  try {
    await createInventoryPage(page).goTo();

    await expect(
      alertsPage.getQuantityTitle()
    ).toBeVisible();
    await expect(
      alertsPage.getQuantityAlert()
    ).toBeVisible();
    await expect(
      alertsPage.getQuantityAlertDetail()
    ).toBeVisible();
  } finally {
    await setCategoryAlertColumn(
      E2E_INVENTORY_ALERTS.CATEGORY,
      E2E_INVENTORY_ALERTS.MINIMUM_COLUMN,
      previous
    );
  }
});

test("operations sees no quantity alert when no category has a minimum", async ({
  page,
}) => {
  const alertsPage = createInventoryAlertsPage(page);

  await createInventoryPage(page).goTo();

  await expect(alertsPage.getQuantityTitle()).toHaveCount(
    0
  );
});
