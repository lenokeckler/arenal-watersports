import type { UnitPhotoSlot } from "./UnitPhotoSlot.interface";

export interface UnitPhotoCardProps {
  canManage: boolean;
  slot: UnitPhotoSlot;
  unitId: string;
}
