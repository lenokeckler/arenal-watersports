import { expect, test } from "@playwright/test";
import { PATHS, WORK_AREA } from "@/app/constants";
import { INVENTORY_COPY } from "@/app/features/operations/inventory/constants/InventoryCopy.constants";
import { createInventoryPage } from "../pages/Inventory.page";
import { createWorkModePage } from "../pages/WorkMode.page";
import { E2E_WORK_MODE_SQL } from "../constants/E2eWorkMode.constants";
import { addOperationsArea } from "../support/addOperationsArea";
import { authenticateInventoryUser } from "../support/authenticateInventoryUser";
import { createInventoryWorkerFixture } from "../support/createInventoryWorkerFixture";
import { runWorkerSql } from "../support/runWorkerSql";

test("allows an operations worker to consult inventory", async ({
  page,
}) => {
  const fixture = await createInventoryWorkerFixture(
    WORK_AREA.OPERATIONS
  );
  try {
    await page.context().clearCookies();
    await authenticateInventoryUser(page, fixture.username);
    const inventory = createInventoryPage(page);
    await inventory.goTo();
    await expect(
      inventory.getHeading(INVENTORY_COPY.TITLE)
    ).toBeVisible();
  } finally {
    await fixture.cleanup();
  }
});
test("redirects reservations mode away from the operations inventory", async ({
  page,
}) => {
  const fixture = await createInventoryWorkerFixture(
    WORK_AREA.RESERVATIONS
  );
  try {
    await addOperationsArea(fixture.id);
    await runWorkerSql(
      E2E_WORK_MODE_SQL.SELECT_RESERVATIONS_MODE_OPERATION,
      E2E_WORK_MODE_SQL.SELECT_RESERVATIONS_MODE,
      fixture.id
    );
    await page.context().clearCookies();
    await authenticateInventoryUser(page, fixture.username);
    const inventory = createInventoryPage(page);
    await inventory.goTo();
    await expect(page).toHaveURL(PATHS.MODE);
    await expect(
      createWorkModePage(page).getCurrentBadge()
    ).toBeVisible();
    await expect(
      inventory.getHeading(INVENTORY_COPY.TITLE)
    ).toHaveCount(0);
  } finally {
    await fixture.cleanup();
  }
});
