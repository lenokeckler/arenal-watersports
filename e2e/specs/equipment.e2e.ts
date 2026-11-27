import { PATHS } from "@/app/constants";
import { EQUIPMENT_HUB_COPY } from "@/app/features/operations/equipment-hub/constants/EquipmentHubCopy.constants";
import { createEquipmentPage } from "../pages/Equipment.page";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Equipment", () => {
  test("opens from the board, reaches each part and comes back the same way", async ({
    boardMotorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const equipment = createEquipmentPage(page);

    await dispatchSheet.addDamageReports();
    await equipment.goTo();
    await equipment.getBoardButton().click();
    await expect(equipment.getHeading()).toBeVisible();

    for (const [title, path] of [
      [
        EQUIPMENT_HUB_COPY.CARDS.damages,
        PATHS.OPERATIONS.DAMAGE_REPORTS,
      ],
      [
        EQUIPMENT_HUB_COPY.CARDS.photos,
        PATHS.OPERATIONS.UNIT_PHOTOS_ROOT,
      ],
      [
        EQUIPMENT_HUB_COPY.CARDS.maintenance,
        PATHS.OPERATIONS.MAINTENANCE,
      ],
    ]) {
      await equipment.openCard(title);
      await expect(page).toHaveURL(new RegExp(`${path}$`));
      await equipment.goBack();
      await expect(equipment.getHeading()).toBeVisible();
    }

    await equipment.goBack();
    await expect(page).toHaveURL(
      new RegExp(`${PATHS.BOARD}$`)
    );
  });

  test("goes back to the screen above when it was opened directly", async ({
    signedInPage: page,
  }) => {
    const freshTab = await page.context().newPage();
    const equipment = createEquipmentPage(freshTab);

    await freshTab.goto(PATHS.OPERATIONS.EQUIPMENT);
    await equipment.goBack();

    await expect(freshTab).toHaveURL(
      new RegExp(`${PATHS.BOARD}$`)
    );
  });
});
