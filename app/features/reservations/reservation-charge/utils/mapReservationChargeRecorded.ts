import type { ReservationChargeRecordRows } from "../models/ReservationChargeRecordRows.type";
import type { ReservationChargeRecorded } from "../models/ReservationChargeRecorded.interface";

export const mapReservationChargeRecorded = (
  rows: ReservationChargeRecordRows
): ReservationChargeRecorded => {
  const [first] = rows;

  return {
    parts: rows.map((row) => ({
      amount: row.charged_amount,
      chargeId: row.charge_id,
      currency: row.charged_currency,
    })),
    paymentMethod: first.charged_payment_method,
    recordedByName: first.recorded_by_name,
  };
};
