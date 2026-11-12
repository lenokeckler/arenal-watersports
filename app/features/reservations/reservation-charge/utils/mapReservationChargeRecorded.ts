import type { ReservationChargeRecordRow } from "../models/ReservationChargeRecordRow.interface";
import type { ReservationChargeRecorded } from "../models/ReservationChargeRecorded.interface";

export const mapReservationChargeRecorded = (
  row: ReservationChargeRecordRow
): ReservationChargeRecorded => ({
  amount: row.charged_amount,
  chargeId: row.charge_id,
  currency: row.charged_currency,
  paymentMethod: row.charged_payment_method,
  recordedByName: row.recorded_by_name,
});
