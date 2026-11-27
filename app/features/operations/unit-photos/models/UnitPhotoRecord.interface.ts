import type { UnitPhotoSlot } from "./UnitPhotoSlot.interface";

export interface UnitPhotoRecord {
  angle: UnitPhotoSlot["angle"];
  storagePath: string;
  unitId: string;
  userId: string;
}
