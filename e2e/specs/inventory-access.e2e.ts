import { expect, test } from "@playwright/test";
import { PATHS, WORK_AREA } from "@/app/constants";
import { INVENTORY_COPY } from "@/app/features/operations/inventory/constants/InventoryCopy.constants";
import { createInventoryPage } from "../pages/Inventory.page";
import { authenticateInventoryUser } from "../support/authenticateInventoryUser";
import { createInventoryWorkerFixture } from "../support/createInventoryWorkerFixture";

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
test("denies inventory to a reservations worker without operations access", async ({
  page,
}) => {
  const fixture = await createInventoryWorkerFixture(
    WORK_AREA.RESERVATIONS
  );
  try {
    await page.context().clearCookies();
    await authenticateInventoryUser(page, fixture.username);
    await createInventoryPage(page).goTo();
    await expect(page).toHaveURL(PATHS.HOME);
  } finally {
    await fixture.cleanup();
  }
});
