import { expect, test } from "@playwright/test";
import {
  E2E_INVENTORY_ADJUSTMENT,
  resolveInventoryAdjustmentCaptureDirectory,
} from "../constants/E2eInventoryAdjustment.constants";
import { resolveDeviceScreenshotFileName } from "../constants/E2eScreenshot.constants";
import { createInventoryStockAdjustmentPage } from "../pages/InventoryStockAdjustment.page";
import { captureViewport } from "../support/captureViewport";
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
  await adjustment.selectReason(
    E2E_INVENTORY_ADJUSTMENT.REASON
  );
  await adjustment.save();
  await expect(
    adjustment.getSuccessMessage()
  ).toBeVisible();
};

test("captures an Operations inventory adjustment", async ({
  page,
}, testInfo) => {
  const scenario =
    await createInventoryStockAdjustmentScenario(page);

  try {
    await submitInventoryStockAdjustment(page);
    await expect(
      createInventoryStockAdjustmentPage(page).getAuthor(
        scenario.actorName
      )
    ).toBeVisible();
    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        E2E_INVENTORY_ADJUSTMENT.SCREENSHOT,
        testInfo.project.name
      ),
      undefined,
      resolveInventoryAdjustmentCaptureDirectory(
        testInfo.project.name
      )
    );
  } finally {
    await scenario.cleanup();
  }
});
