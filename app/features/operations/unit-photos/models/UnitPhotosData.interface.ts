import type { UnitPhotoSlot } from "./UnitPhotoSlot.interface";
import type { UnitPhotosUnit } from "./UnitPhotosUnit.interface";

export interface UnitPhotosData {
  slots: UnitPhotoSlot[];
  unit: UnitPhotosUnit;
}
