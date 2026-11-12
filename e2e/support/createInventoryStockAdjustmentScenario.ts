import type { Page } from "@playwright/test";
import {
  INVENTORY_TRACKING_MODE,
  WORK_AREA,
} from "@/app/constants";
import { E2E_INVENTORY_ADJUSTMENT } from "../constants/E2eInventoryAdjustment.constants";
import { E2E_INVENTORY_SCENARIO } from "../constants/E2eInventoryScenario.constants";
import { createInventoryPage } from "../pages/Inventory.page";
import { authenticateInventoryUser } from "./authenticateInventoryUser";
import { createInventoryCategoryFixture } from "./createInventoryCategoryFixture";
import { createInventoryWorkerFixture } from "./createInventoryWorkerFixture";
import { runWorkerSql } from "./runWorkerSql";
import { writeInventoryStockFixture } from "./writeInventoryStockFixture";

const setOperationsMode = async (
  workerId: string
): Promise<void> => {
  await runWorkerSql(
    E2E_INVENTORY_ADJUSTMENT.SELECT_OPERATIONS_MODE_OPERATION,
    E2E_INVENTORY_ADJUSTMENT.SELECT_OPERATIONS_MODE,
    workerId
  );
};

const cleanupScenario = async (
  category: Awaited<
    ReturnType<typeof createInventoryCategoryFixture>
  >,
  worker: Awaited<
    ReturnType<typeof createInventoryWorkerFixture>
  >
): Promise<void> => {
  try {
    await category.cleanup();
  } finally {
    await worker.cleanup();
  }
};

export const createInventoryStockAdjustmentScenario =
  async (page: Page) => {
    const worker = await createInventoryWorkerFixture(
      WORK_AREA.OPERATIONS
    );

    try {
      await setOperationsMode(worker.id);
      const category = await createInventoryCategoryFixture(
        INVENTORY_TRACKING_MODE.BY_QUANTITY
      );

      try {
        await writeInventoryStockFixture(
          category,
          E2E_INVENTORY_SCENARIO.STOCK
        );
        await page.context().clearCookies();
        await authenticateInventoryUser(
          page,
          worker.username
        );
        await createInventoryPage(page).goToCategoryId(
          category.id
        );

        return {
          actorName: worker.username,
          cleanup: () => cleanupScenario(category, worker),
        };
      } catch (error) {
        await category.cleanup();
        throw error;
      }
    } catch (error) {
      await worker.cleanup();
      throw error;
    }
  };
