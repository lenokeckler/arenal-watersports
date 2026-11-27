import type { ReservationDepositActionResult } from "./ReservationDepositActionResult.type";

export interface ReservationDepositSubmitOutcome {
  mayBeRecorded: boolean;
  result: ReservationDepositActionResult;
}
