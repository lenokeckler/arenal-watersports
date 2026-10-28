import { expect, test } from "@playwright/test";
import { INVENTORY_TRACKING_MODE } from "@/app/constants";
import { INVENTORY_COPY } from "@/app/features/operations/inventory/constants/InventoryCopy.constants";
import { E2E_INVENTORY_FIXTURE } from "../constants/E2eInventory.constants";
import {
  E2E_INVENTORY_SCENARIO,
  E2E_INVENTORY_UNIT_STATES,
} from "../constants/E2eInventoryScenario.constants";
import { createInventoryPage } from "../pages/Inventory.page";
import { createInventoryCategoryFixture } from "../support/createInventoryCategoryFixture";
import { seedInventoryUnitStates } from "../support/seedInventoryUnitStates";

test("shows both boat codes and their current state", async ({
  page,
}) => {
  const inventory = createInventoryPage(page);
  await inventory.goTo();
  await inventory.goToCategory(
    E2E_INVENTORY_FIXTURE.BOAT_CATEGORY
  );
  for (const code of E2E_INVENTORY_SCENARIO.BOAT_CODES) {
    await expect(
      inventory.getUnitStatus(
        code,
        E2E_INVENTORY_UNIT_STATES[0]
      )
    ).toBeVisible();
  }
});

test("shows the empty unit category state", async ({
  page,
}) => {
  const fixture = await createInventoryCategoryFixture(
    INVENTORY_TRACKING_MODE.BY_UNIT
  );
  try {
    await createInventoryPage(page).goToCategoryId(
      fixture.id
    );
    await expect(
      createInventoryPage(page).getCopy(
        INVENTORY_COPY.CATEGORY_EMPTY
      )
    ).toBeVisible();
  } finally {
    await fixture.cleanup();
  }
});

test("shows every recorded active unit state with its code", async ({
  page,
}) => {
  const fixture = await createInventoryCategoryFixture(
    INVENTORY_TRACKING_MODE.BY_UNIT
  );
  try {
    const units = await seedInventoryUnitStates(fixture);
    await createInventoryPage(page).goToCategoryId(
      fixture.id
    );
    const inventory = createInventoryPage(page);
    for (const unit of units) {
      await expect(
        inventory.getUnitStatus(unit.code, unit.status)
      ).toBeVisible();
    }
  } finally {
    await fixture.cleanup();
  }
});
