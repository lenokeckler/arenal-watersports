import { expect, test } from "@playwright/test";
import { INVENTORY_UNIT_STATUS } from "@/app/constants";
import { E2E_INVENTORY_FIXTURE } from "../constants/E2eInventory.constants";
import { E2E_UNIT_CONDITION } from "../constants/E2eInventoryUnitCondition.constants";
import { createInventoryPage } from "../pages/Inventory.page";

test("operations marks a unit damaged, in repair and available again from the inventory", async ({
  page,
}) => {
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

    await inventoryPage
      .getUnitConditionButton(
        code,
        E2E_UNIT_CONDITION.MARK_IN_REPAIR
      )
      .click();
    await expect(
      inventoryPage.getUnitStatus(
        code,
        INVENTORY_UNIT_STATUS.IN_REPAIR
      )
    ).toBeVisible();
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
});
