import { UNIT_PHOTO_BASIC_ANGLES } from "@/app/constants";
import type { PhotoUnit } from "@/app/services/equipment/models/PhotoUnit.interface";

export const countMissingPhotos = (
  units: PhotoUnit[]
): number =>
  units.filter(
    (unit) =>
      unit.basicCount < UNIT_PHOTO_BASIC_ANGLES.length
  ).length;
