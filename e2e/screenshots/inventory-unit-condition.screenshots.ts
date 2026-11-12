import { expect, test } from "@playwright/test";
import { INVENTORY_UNIT_STATUS } from "@/app/constants";
import { E2E_INVENTORY_FIXTURE } from "../constants/E2eInventory.constants";
import {
  E2E_UNIT_CONDITION,
  E2E_UNIT_CONDITION_SCREENSHOT_BASENAME,
} from "../constants/E2eInventoryUnitCondition.constants";
import { createInventoryPage } from "../pages/Inventory.page";
import { captureFullPage } from "../support/captureFullPage";

test("captures a unit marked damaged and then available again", async ({
  page,
}, testInfo) => {
  const inventoryPage = createInventoryPage(page);
  const code = E2E_INVENTORY_FIXTURE.JET_SKI_UNIT_CODE;
  await inventoryPage.goTo();
  await inventoryPage.goToCategory(
    E2E_INVENTORY_FIXTURE.JET_SKI_CATEGORY
  );

  try {
    await inventoryPage
      .getUnitConditionButton(
        code,
        E2E_UNIT_CONDITION.MARK_DAMAGED
      )
      .click();
    await expect(
      inventoryPage.getUnitStatus(
        code,
        INVENTORY_UNIT_STATUS.DAMAGED
      )
    ).toBeVisible();
    await captureFullPage(
      page,
      E2E_UNIT_CONDITION_SCREENSHOT_BASENAME.DAMAGED,
      testInfo.project.name
    );
  } finally {
    await inventoryPage
      .getUnitConditionButton(
        code,
        E2E_UNIT_CONDITION.MARK_AVAILABLE
      )
      .click();
    await expect(
      inventoryPage.getUnitStatus(
        code,
        INVENTORY_UNIT_STATUS.AVAILABLE
      )
    ).toBeVisible();
  }
  await captureFullPage(
    page,
    E2E_UNIT_CONDITION_SCREENSHOT_BASENAME.AVAILABLE_AGAIN,
    testInfo.project.name
  );
});
