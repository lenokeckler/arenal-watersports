import { PATHS } from "@/app/constants";
import { E2E_EQUIPMENT_SCREENSHOT_BASENAME } from "../constants/E2eEquipment.constants";
import { createEquipmentPage } from "../pages/Equipment.page";
import { createUnitHistoryPage } from "../pages/UnitHistory.page";
import { createUnitPhotosPage } from "../pages/UnitPhotos.page";
import { captureFullPage } from "../support/captureFullPage";
import { seedEquipmentRecords } from "../support/seedEquipmentRecords";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Equipment screenshots", () => {
  test("captures the board button, the equipment screen and a machine", async ({
    boardMotorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }, testInfo) => {
    const equipment = createEquipmentPage(page);
    const photos = createUnitPhotosPage(page);
    const history = createUnitHistoryPage(page);
    const [unit] = dispatchSheet.unitCodes;
    const capture = (name: string): Promise<void> =>
      captureFullPage(page, name, testInfo.project.name);

    await seedEquipmentRecords(dispatchSheet, unit);

    await equipment.goTo();
    await expect(equipment.getBoardButton()).toBeVisible();
    await capture(E2E_EQUIPMENT_SCREENSHOT_BASENAME.BOARD);

    await equipment.getBoardButton().click();
    await expect(equipment.getHeading()).toBeVisible();
    await capture(E2E_EQUIPMENT_SCREENSHOT_BASENAME.HUB);

    await page.goto(PATHS.OPERATIONS.UNIT_PHOTOS_ROOT);
    await capture(
      E2E_EQUIPMENT_SCREENSHOT_BASENAME.PHOTO_LIST
    );

    const unitId = await dispatchSheet.readUnitId(unit);
    await photos.goTo(unitId);
    await expect(photos.getPhoto("front")).toBeVisible();
    await capture(
      E2E_EQUIPMENT_SCREENSHOT_BASENAME.UNIT_PHOTOS
    );

    await history.goTo(unitId);
    await expect(history.getHeading(unit)).toBeVisible();
    await capture(
      E2E_EQUIPMENT_SCREENSHOT_BASENAME.UNIT_HISTORY
    );
  });
});
