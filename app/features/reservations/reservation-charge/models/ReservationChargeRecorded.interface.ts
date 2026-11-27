import type { ReservationChargeRecordedPart } from "./ReservationChargeRecordedPart.interface";

export interface ReservationChargeRecorded {
  parts: readonly ReservationChargeRecordedPart[];
  paymentMethod: string;
  recordedByName: string;
}
