import type { Locator, Page } from "@playwright/test";
import { E2E_INVENTORY_ALERTS } from "../constants/E2eInventoryAlerts.constants";

export const createInventoryAlertsPage = (page: Page) => ({
  getExpiryAlert: (): Locator =>
    page
      .getByRole("region", {
        name: E2E_INVENTORY_ALERTS.EXPIRY_TITLE,
      })
      .getByRole("link", {
        name: E2E_INVENTORY_ALERTS.EXPIRY_CATEGORY,
      }),
  getExpiryAlertDetail: (): Locator =>
    page.getByText(E2E_INVENTORY_ALERTS.EXPIRY_DETAIL),
  getExpiryTitle: (): Locator =>
    page.getByText(E2E_INVENTORY_ALERTS.EXPIRY_TITLE),
  getQuantityAlert: (): Locator =>
    page
      .getByRole("region", {
        name: E2E_INVENTORY_ALERTS.QUANTITY_TITLE,
      })
      .getByRole("link", {
        name: E2E_INVENTORY_ALERTS.CATEGORY,
      }),
  getQuantityAlertDetail: (): Locator =>
    page.getByText(E2E_INVENTORY_ALERTS.QUANTITY_DETAIL),
  getQuantityTitle: (): Locator =>
    page.getByText(E2E_INVENTORY_ALERTS.QUANTITY_TITLE),
});
