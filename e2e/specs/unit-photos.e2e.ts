import { UNIT_PHOTO_ANGLES } from "@/app/constants";
import { UNIT_PHOTOS_COPY } from "@/app/features/operations/unit-photos/constants/UnitPhotosCopy.constants";
import { E2E_UNIT_PHOTOS } from "../constants/E2eUnitPhotos.constants";
import { createUnitPhotosPage } from "../pages/UnitPhotos.page";
import { deleteFrontPhoto } from "../support/deleteFrontPhoto";
import { replaceFrontPhoto } from "../support/replaceFrontPhoto";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Unit photos", () => {
  test("lets a temporary guide see the photos without changing them", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const photos = createUnitPhotosPage(page);
    const [unit] = dispatchSheet.unitCodes;

    await dispatchSheet.addUnitPhoto(unit, "front");
    await dispatchSheet.makeTemporaryGuide();
    await photos.goTo(await dispatchSheet.readUnitId(unit));

    await expect(photos.getHeading()).toBeVisible();
    await expect(photos.getImpacts(0)).toBeAttached();
    await expect(photos.getPhoto("front")).toBeVisible();
    await expect(photos.getViewOnlyNotice()).toBeVisible();
    await expect(
      photos.getSlot("right_side")
    ).toContainText(UNIT_PHOTOS_COPY.NO_PHOTO);
    await expect(photos.getUploadInputs()).toHaveCount(0);
  });

  test("lets operations upload, replace and delete a photo", async ({
    activeWorker,
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const photos = createUnitPhotosPage(page);
    const [unit] = dispatchSheet.unitCodes;
    const unitId = await dispatchSheet.readUnitId(unit);

    await photos.goTo(unitId);
    await expect(photos.getUploadInputs()).toHaveCount(
      UNIT_PHOTO_ANGLES.length
    );

    await photos.uploadPhoto("front", false);

    await expect(
      photos.getNotice(UNIT_PHOTOS_COPY.SAVED)
    ).toBeVisible();
    await expect(photos.getPhoto("front")).toBeVisible();
    const [first] =
      await dispatchSheet.readUnitPhotos(unit);
    expect(first).toMatchObject({
      angle: "front",
      uploadedBy: activeWorker.id,
    });
    expect(first.storagePath).toContain(
      `${unitId}${E2E_UNIT_PHOTOS.PHOTO_PATH_SEPARATOR}front`
    );

    await replaceFrontPhoto(photos, dispatchSheet, unit);
    await deleteFrontPhoto(photos, unitId);
    await expect
      .poll(() => dispatchSheet.readUnitPhotos(unit))
      .toEqual([]);
  });

  test("refuses a file that is not an image", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const photos = createUnitPhotosPage(page);
    const [unit] = dispatchSheet.unitCodes;

    await photos.goTo(await dispatchSheet.readUnitId(unit));
    await photos.uploadPhoto(
      "front",
      false,
      "application/pdf"
    );

    await expect(
      photos.getNotice(UNIT_PHOTOS_COPY.ERROR_TYPE)
    ).toBeVisible();
    expect(
      await dispatchSheet.readUnitPhotos(unit)
    ).toHaveLength(0);
  });

  test("says the unit was not found for an unknown one", async ({
    signedInPage: page,
  }) => {
    const photos = createUnitPhotosPage(page);

    await photos.goTo(E2E_UNIT_PHOTOS.UNKNOWN_UNIT_ID);

    await expect(photos.getNotFound()).toBeVisible();
  });
});
