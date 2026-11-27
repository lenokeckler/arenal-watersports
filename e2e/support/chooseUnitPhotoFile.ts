import type { Page } from "@playwright/test";
import { UNIT_PHOTOS_COPY } from "@/app/features/operations/unit-photos/constants/UnitPhotosCopy.constants";
import { E2E_UNIT_PHOTOS } from "../constants/E2eUnitPhotos.constants";
import type { PhotoUpload } from "../models/PhotoUpload.interface";
import { buildE2ePhoto } from "./buildE2ePhoto";

export const chooseUnitPhotoFile = async (
  page: Page,
  { angle, isReplacing, mimeType }: PhotoUpload
): Promise<void> => {
  const action = isReplacing
    ? UNIT_PHOTOS_COPY.REPLACE
    : UNIT_PHOTOS_COPY.UPLOAD;

  await page
    .getByLabel(
      `${action}: ${UNIT_PHOTOS_COPY.ANGLE[angle]}`
    )
    .setInputFiles({
      buffer: buildE2ePhoto(),
      mimeType,
      name: E2E_UNIT_PHOTOS.PHOTO_NAME,
    });
};
