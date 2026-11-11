import type { UnitPhotoSlot } from "./UnitPhotoSlot.interface";
import type { UnitPhotosUnit } from "./UnitPhotosUnit.interface";

export interface UnitPhotosData {
  canManage: boolean;
  slots: UnitPhotoSlot[];
  unit: UnitPhotosUnit;
}
