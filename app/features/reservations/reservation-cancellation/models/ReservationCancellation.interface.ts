import type { ReservationCancellationEquipmentLine } from "./ReservationCancellationEquipmentLine.interface";
import type { ReservationCancellationStatus } from "./ReservationCancellationStatus.type";

export interface ReservationCancellation {
  code: string;
  customerName: string;
  date: string;
  equipment: ReservationCancellationEquipmentLine[];
  expectedUpdatedAt: string;
  id: string;
  isCancellable: boolean;
  requiresCause: boolean;
  status: ReservationCancellationStatus;
  time: string;
}
