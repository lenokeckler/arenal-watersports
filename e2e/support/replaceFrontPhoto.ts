import type { UnitPhotosPage } from "../models/UnitPhotosPage.type";
import { expect } from "./dispatchSheetTest";
import type { DispatchSheetFixture } from "./models/DispatchSheetFixture.interface";

export const replaceFrontPhoto = async (
  photos: UnitPhotosPage,
  dispatchSheet: DispatchSheetFixture,
  unit: string
): Promise<void> => {
  const [previous] =
    await dispatchSheet.readUnitPhotos(unit);

  await photos.openLarge("front");
  await photos.uploadPhoto("front", true);

  await expect
    .poll(async () => {
      const [current] =
        await dispatchSheet.readUnitPhotos(unit);

      return current.storagePath === previous.storagePath;
    })
    .toBe(false);
};
