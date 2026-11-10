import type { ReservationPostponementBlock } from "./ReservationPostponementBlock.type";
import type { ReservationPostponementEquipmentLine } from "./ReservationPostponementEquipmentLine.interface";
import type { ReservationPostponementReadingUnit } from "./ReservationPostponementReadingUnit.interface";
import type { ReservationPostponementStatus } from "./ReservationPostponementStatus.type";

export interface ReservationPostponement {
  block: ReservationPostponementBlock;
  code: string;
  customerName: string;
  date: string;
  durationMinutes: number;
  equipment: ReservationPostponementEquipmentLine[];
  expectedUpdatedAt: string;
  id: string;
  isDispatched: boolean;
  readingUnits: ReservationPostponementReadingUnit[];
  status: ReservationPostponementStatus;
  time: string;
}
