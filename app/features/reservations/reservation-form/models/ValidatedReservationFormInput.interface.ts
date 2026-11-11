import type { ReservationEquipmentCommitment } from "./ReservationEquipmentCommitment.type";
import type { ReservationType } from "./ReservationType.type";

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
