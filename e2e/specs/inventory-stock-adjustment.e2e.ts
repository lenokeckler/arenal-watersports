import { expect, test } from "@playwright/test";
import { E2E_INVENTORY_ADJUSTMENT } from "../constants/E2eInventoryAdjustment.constants";
import { createInventoryMetricsPage } from "../pages/InventoryMetrics.page";
import { createInventoryStockAdjustmentPage } from "../pages/InventoryStockAdjustment.page";
import { createInventoryStockAdjustmentScenario } from "../support/createInventoryStockAdjustmentScenario";

const submitInventoryStockAdjustment = async (
  page: Parameters<
    typeof createInventoryStockAdjustmentPage
  >[0]
): Promise<void> => {
  const adjustment =
    createInventoryStockAdjustmentPage(page);
  await adjustment.fillAvailable(
    E2E_INVENTORY_ADJUSTMENT.AVAILABLE
  );
  await adjustment.fillDamaged(
    E2E_INVENTORY_ADJUSTMENT.DAMAGED
  );
  await adjustment.fillInRepair(
    E2E_INVENTORY_ADJUSTMENT.IN_REPAIR
  );
  await adjustment.save();
  await expect(
    adjustment.getRequiredReasonError()
  ).toBeVisible();
  await adjustment.selectReason(
    E2E_INVENTORY_ADJUSTMENT.REASON
  );
  await adjustment.save();
};

const expectInventoryStockAdjustment = async (
  page: Parameters<
    typeof createInventoryStockAdjustmentPage
  >[0],
  actorName: string
): Promise<void> => {
  const adjustment =
    createInventoryStockAdjustmentPage(page);
  await expect(
    adjustment.getSuccessMessage()
  ).toBeVisible();
  await expect(
    adjustment.getAuthor(actorName)
  ).toBeVisible();
  await expect(adjustment.getDate()).toBeVisible();
  await expect(
    adjustment.getReason(E2E_INVENTORY_ADJUSTMENT.REASON)
  ).toBeVisible();
  await expect(
    createInventoryMetricsPage(page).getAvailable()
  ).toContainText(E2E_INVENTORY_ADJUSTMENT.AVAILABLE);
};

test("records an operations stock adjustment and its author", async ({
  page,
}) => {
  const scenario =
    await createInventoryStockAdjustmentScenario(page);
  try {
    await submitInventoryStockAdjustment(page);
    await expectInventoryStockAdjustment(
      page,
      scenario.actorName
    );
  } finally {
    await scenario.cleanup();
  }
});
