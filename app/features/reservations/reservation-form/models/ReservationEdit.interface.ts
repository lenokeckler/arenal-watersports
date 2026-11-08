import type { NullableRef } from "@/app/types";
import type { ReservationEquipmentLock } from "../constants/ReservationEquipmentLock.constants";
import type { ReservationEditEquipment } from "./ReservationEditEquipment.interface";

export interface ReservationEdit {
  customerName: string;
  date: string;
  durationMinutes: number;
  equipment: NullableRef<ReservationEditEquipment>;
  equipmentLock: ReservationEquipmentLock;
  id: string;
  isEditable: boolean;
  lastEditLabel: string;
  lastEditedAt: string;
  peopleCount: number;
  time: string;
}
