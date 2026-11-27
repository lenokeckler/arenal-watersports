import { E2E_UNIT_PHOTOS_SCREENSHOT_BASENAME } from "../constants/E2eUnitPhotos.constants";
import { createUnitPhotosPage } from "../pages/UnitPhotos.page";
import { captureFullPage } from "../support/captureFullPage";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Unit photos screenshots", () => {
  test("captures the photos of a unit for operations", async ({
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

  test("captures the photos of a unit for a temporary guide", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }, testInfo) => {
    const photos = createUnitPhotosPage(page);
    const [unit] = dispatchSheet.unitCodes;

    await dispatchSheet.addUnitPhoto(unit, "front");
    await dispatchSheet.makeTemporaryGuide();
    await photos.goTo(await dispatchSheet.readUnitId(unit));
    await expect(photos.getPhoto("front")).toBeVisible();
    await expect(photos.getViewOnlyNotice()).toBeVisible();
    await captureFullPage(
      page,
      E2E_UNIT_PHOTOS_SCREENSHOT_BASENAME.TEMPORARY_GUIDE,
      testInfo.project.name
    );
  });
});
