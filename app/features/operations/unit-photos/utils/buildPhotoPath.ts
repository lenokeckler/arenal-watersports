import { UNIT_PHOTO_UPLOAD } from "../constants/UnitPhotos.constants";
import type { UnitPhotoSlot } from "../models/UnitPhotoSlot.interface";

export const buildPhotoPath = (
  unitId: string,
  angle: UnitPhotoSlot["angle"],
  takenAt: number
): string =>
  `${unitId}${UNIT_PHOTO_UPLOAD.PATH_SEPARATOR}${angle}${UNIT_PHOTO_UPLOAD.VERSION_SEPARATOR}${takenAt}`;
