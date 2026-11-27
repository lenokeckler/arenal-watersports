import { UNIT_PHOTO_BASIC_ANGLES } from "@/app/constants";
import type { PhotoUnit } from "./models/PhotoUnit.interface";
import type { PhotoUnitRow } from "./models/PhotoUnitRow.interface";

export const mapPhotoUnit = (
  row: PhotoUnitRow
): PhotoUnit => {
  const basic = UNIT_PHOTO_BASIC_ANGLES.flatMap((angle) =>
    row.photos.filter((photo) => photo.angle === angle)
  );

  return {
    basicCount: basic.length,
    categoryId: row.category.id,
    categoryName: row.category.name,
    code: row.code,
    id: row.id,
    imagePath: row.category.image_path,
    impactCount: row.impact_count,
  };
};
