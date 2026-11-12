import { E2E_UNIT_PHOTOS_SCREENSHOT_BASENAME } from "../constants/E2eUnitPhotos.constants";
import { createUnitPhotosPage } from "../pages/UnitPhotos.page";
import { captureFullPage } from "../support/captureFullPage";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Unit photos screenshots", () => {
  test("captures the photos of a unit for the rest of operations", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }, testInfo) => {
    const photos = createUnitPhotosPage(page);
    const [unit] = dispatchSheet.unitCodes;

    await dispatchSheet.addUnitPhoto(unit, "front");
    await dispatchSheet.addUnitPhoto(unit, "right_side");
    await photos.goTo(await dispatchSheet.readUnitId(unit));
    await expect(photos.getPhoto("front")).toBeVisible();
    await captureFullPage(
      page,
      E2E_UNIT_PHOTOS_SCREENSHOT_BASENAME.VIEW,
      testInfo.project.name
    );
  });

  test("captures the photos of a unit with the upload buttons of the general manager", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }, testInfo) => {
    const photos = createUnitPhotosPage(page);
    const [unit] = dispatchSheet.unitCodes;

    await dispatchSheet.grantGeneralManagerMark();
    await dispatchSheet.addUnitPhoto(unit, "front");
    await photos.goTo(await dispatchSheet.readUnitId(unit));
    await expect(photos.getPhoto("front")).toBeVisible();
    await expect(photos.getUploadInputs()).toHaveCount(4);
    await captureFullPage(
      page,
      E2E_UNIT_PHOTOS_SCREENSHOT_BASENAME.MANAGER,
      testInfo.project.name
    );
  });
});
