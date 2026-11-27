import type { ReservationExtraTimeCharge } from "./ReservationExtraTimeCharge.interface";

export interface ReservationExtraTimeRecordedCharge extends ReservationExtraTimeCharge {
  chargeId: string;
}
