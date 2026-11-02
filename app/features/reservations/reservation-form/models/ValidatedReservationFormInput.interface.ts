import type { ReservationEquipmentCommitment } from "./ReservationEquipmentCommitment.type";

export interface ValidatedReservationFormInput {
  customerName: string;
  date: string;
  durationMinutes: number;
  peopleCount: number;
  time: string;
  equipmentCommitment: ReservationEquipmentCommitment;
}
