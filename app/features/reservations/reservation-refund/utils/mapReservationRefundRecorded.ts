import type { ReservationRefundRecordRow } from "../models/ReservationRefundRecordRow.type";
import type { ReservationRefundRecorded } from "../models/ReservationRefundRecorded.interface";

export const mapReservationRefundRecorded = (
  row: ReservationRefundRecordRow
): ReservationRefundRecorded => ({
  amount: row.refunded_amount,
  currency: row.refunded_currency,
  id: row.refund_id,
  reason: row.refunded_reason,
  recordedByName: row.recorded_by_name,
  remaining: row.remaining_amount,
});
