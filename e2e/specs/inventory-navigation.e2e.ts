import { expect, test } from "@playwright/test";
import { HTTP_STATUS, PATHS } from "@/app/constants";
import { INVENTORY_COPY } from "@/app/features/operations/inventory/constants/InventoryCopy.constants";
import { E2E_INVENTORY_FIXTURE } from "../constants/E2eInventory.constants";
import { E2E_INVENTORY_SCENARIO } from "../constants/E2eInventoryScenario.constants";
import { createInventoryPage } from "../pages/Inventory.page";

test("returns to the overview from a category", async ({
  page,
}) => {
  const inventory = createInventoryPage(page);
  await inventory.goTo();
  await inventory.goToCategory(
    E2E_INVENTORY_FIXTURE.QUANTITY_CATEGORY
  );
  await inventory
    .getCategoryLink(INVENTORY_COPY.BACK_TO_INVENTORY)
    .click();
  await expect(
    inventory.getHeading(INVENTORY_COPY.TITLE)
  ).toBeVisible();
  await expect(page).toHaveURL(PATHS.OPERATIONS.INVENTORY);
});

for (const categoryId of [
  E2E_INVENTORY_SCENARIO.INVALID_CATEGORY,
  E2E_INVENTORY_SCENARIO.MISSING_CATEGORY,
]) {
  test(`returns not found for category ${categoryId}`, async ({
    page,
  }) => {
    const response =
      await createInventoryPage(page).goToCategoryId(
        categoryId
      );
    expect(response?.status()).toBe(HTTP_STATUS.NOT_FOUND);
  });
}

test("normalizes an out-of-range overview page", async ({
  page,
}) => {
  const requestedPath = PATHS.OPERATIONS.INVENTORY_PAGE(
    E2E_INVENTORY_SCENARIO.OUT_OF_RANGE_PAGE
  );
  await createInventoryPage(page).goToPage(
    E2E_INVENTORY_SCENARIO.OUT_OF_RANGE_PAGE
  );
  await expect(
    createInventoryPage(page).getHeading(
      INVENTORY_COPY.TITLE
    )
  ).toBeVisible();
  await expect(page).not.toHaveURL(requestedPath);
});
