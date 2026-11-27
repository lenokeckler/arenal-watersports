import type { ReservationExtraTimeRecordRow } from "../models/ReservationExtraTimeRecordRow.type";
import type { ReservationExtraTimeRecorded } from "../models/ReservationExtraTimeRecorded.interface";

export const mapReservationExtraTimeRecorded = (
  row: ReservationExtraTimeRecordRow
): ReservationExtraTimeRecorded => ({
  charge:
    row.charge_id === null ||
    row.charged_amount === null ||
    row.charged_currency === null ||
    row.charged_payment_method === null
      ? null
      : {
          amount: row.charged_amount,
          chargeId: row.charge_id,
          currency: row.charged_currency,
          paymentMethod: row.charged_payment_method,
        },
  extraMinutes: row.extra_minutes,
  outcome: row.outcome,
  recordedByName: row.recorded_by_name,
});
