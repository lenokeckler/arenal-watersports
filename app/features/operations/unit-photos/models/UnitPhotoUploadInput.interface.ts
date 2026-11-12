import type { UnitPhotoSlot } from "./UnitPhotoSlot.interface";

export interface UnitPhotoUploadInput {
  angle: UnitPhotoSlot["angle"];
  file: File;
  unitId: string;
}
