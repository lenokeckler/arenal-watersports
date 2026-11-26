import type { ReservationRefundActionResult } from "./ReservationRefundActionResult.type";

export interface ReservationRefundSubmitOutcome {
  mayBeRecorded: boolean;
  result: ReservationRefundActionResult;
}
