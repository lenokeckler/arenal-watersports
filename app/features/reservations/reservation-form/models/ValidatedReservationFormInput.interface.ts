import type { ReservationType } from "./ReservationType.type";
import type { ReservationEquipmentCommitment } from "./ReservationEquipmentCommitment.type";

export interface ValidatedReservationFormInput {
  customerName: string;
  date: string;
  durationMinutes: number;
  extraIds: string[];
  guideIds?: string[];
  peopleCount: number;
  reservationType: ReservationType;
  time: string;
  equipmentCommitment: ReservationEquipmentCommitment;
}
