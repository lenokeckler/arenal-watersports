import { UNIT_PHOTOS_COPY } from "@/app/features/operations/unit-photos/constants/UnitPhotosCopy.constants";
import type { UnitPhotosPage } from "../models/UnitPhotosPage.type";
import { expect } from "./dispatchSheetTest";

export const deleteFrontPhoto = async (
  photos: UnitPhotosPage,
  unitId: string
): Promise<void> => {
  await photos.goTo(unitId);
  await photos.openLarge("front");
  await photos.askToDelete("front");
  await photos.confirmDelete();

  await expect(
    photos.getNotice(UNIT_PHOTOS_COPY.DELETED)
  ).toBeVisible();
};
