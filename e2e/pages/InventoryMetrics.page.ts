import type { Page } from "@playwright/test";
import { INVENTORY_COPY } from "@/app/features/operations/inventory/constants/InventoryCopy.constants";
import { getMainRegion } from "../support/mainRegion";

export const createInventoryMetricsPage = (page: Page) => {
  const metrics = getMainRegion(page).locator("div.grid");
  const getMetric = (label: string) =>
    metrics.getByText(label, { exact: true }).locator("..");

  return {
    getAvailable: () => getMetric(INVENTORY_COPY.AVAILABLE),
    getDamaged: () => getMetric(INVENTORY_COPY.DAMAGED),
    getInUse: () => getMetric(INVENTORY_COPY.IN_USE),
    getInRepair: () => getMetric(INVENTORY_COPY.IN_REPAIR),
    getTotal: () => getMetric(INVENTORY_COPY.TOTAL),
  };
};
