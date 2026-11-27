import { UNIT_PHOTO_BASIC_ANGLES } from "@/app/constants";
import type { UnitPhotoSlot } from "../models/UnitPhotoSlot.interface";

export const countBasicPhotos = (
  slots: UnitPhotoSlot[]
): number =>
  slots.filter(
    (slot) =>
      slot.url !== null &&
      (
        UNIT_PHOTO_BASIC_ANGLES as readonly string[]
      ).includes(slot.angle)
  ).length;
