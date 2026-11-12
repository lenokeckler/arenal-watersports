import { UNIT_PHOTO_ANGLES } from "../constants/UnitPhotos.constants";
import type { UnitPhotoRow } from "../models/UnitPhotoRow.interface";
import type { UnitPhotoSlot } from "../models/UnitPhotoSlot.interface";

export const buildPhotoSlots = (
  rows: UnitPhotoRow[],
  urlByPath: Map<string, string>
): UnitPhotoSlot[] =>
  UNIT_PHOTO_ANGLES.map((angle) => {
    const row = rows.find((item) => item.angle === angle);

    return {
      angle,
      url: row
        ? (urlByPath.get(row.storage_path) ?? null)
        : null,
    };
  });
