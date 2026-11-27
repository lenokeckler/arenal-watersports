import type { ReservationExtraTimeOutcome } from "./ReservationExtraTimeOutcome.type";

export interface ReservationExtraTimeResolution {
  extraMinutes: number;
  outcome: ReservationExtraTimeOutcome;
}
