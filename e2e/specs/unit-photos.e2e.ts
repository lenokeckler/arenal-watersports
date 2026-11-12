import { UNIT_PHOTOS_COPY } from "@/app/features/operations/unit-photos/constants/UnitPhotosCopy.constants";
import { E2E_UNIT_PHOTOS } from "../constants/E2eUnitPhotos.constants";
import { createUnitPhotosPage } from "../pages/UnitPhotos.page";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Unit photos", () => {
  test("shows the photos next to the impact count without letting the rest of operations change them", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const photos = createUnitPhotosPage(page);
    const [unit] = dispatchSheet.unitCodes;

    await dispatchSheet.addUnitPhoto(unit, "front");
    await photos.goTo(await dispatchSheet.readUnitId(unit));

    await expect(photos.getHeading()).toBeVisible();
    await expect(photos.getImpacts(0)).toBeVisible();
    await expect(photos.getPhoto("front")).toBeVisible();
    await expect(
      photos.getSlot("right_side")
    ).toContainText(UNIT_PHOTOS_COPY.NO_PHOTO);
    await expect(photos.getUploadInputs()).toHaveCount(0);
  });

  test("lets the general manager upload a photo and replace it", async ({
    activeWorker,
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const photos = createUnitPhotosPage(page);
    const [unit] = dispatchSheet.unitCodes;

    await dispatchSheet.grantGeneralManagerMark();
    await photos.goTo(await dispatchSheet.readUnitId(unit));
    await expect(photos.getUploadInputs()).toHaveCount(4);

    await photos.uploadPhoto("front", false);

    await expect(photos.getSaved()).toBeVisible();
    await expect(photos.getPhoto("front")).toBeVisible();
    await expect
      .poll(() => dispatchSheet.readUnitPhotos(unit))
      .toEqual([
        {
          angle: "front",
          storagePath: `${await dispatchSheet.readUnitId(unit)}${E2E_UNIT_PHOTOS.PHOTO_PATH_SEPARATOR}front`,
          uploadedBy: activeWorker.id,
        },
      ]);

    await photos.uploadPhoto("front", true);

    await expect(photos.getSaved()).toBeVisible();
    expect(
      await dispatchSheet.readUnitPhotos(unit)
    ).toHaveLength(1);
  });

  test("refuses a file that is not an image", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const photos = createUnitPhotosPage(page);
    const [unit] = dispatchSheet.unitCodes;

    await dispatchSheet.grantGeneralManagerMark();
    await photos.goTo(await dispatchSheet.readUnitId(unit));
    await photos.uploadPhoto(
      "front",
      false,
      "application/pdf"
    );

    await expect(
      page.getByText(UNIT_PHOTOS_COPY.ERROR_TYPE)
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
