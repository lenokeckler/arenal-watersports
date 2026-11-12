import type { ReservationEquipmentCommitment } from "./ReservationEquipmentCommitment.type";

export interface ValidatedReservationEditInput {
  durationMinutes: number;
  equipmentCommitment: ReservationEquipmentCommitment;
  expectedUpdatedAt: string;
  peopleCount: number;
  reservationId: string;
  time: string;
}
