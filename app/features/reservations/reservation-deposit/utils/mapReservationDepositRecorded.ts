import { RESERVATION_DEPOSIT_DECISION_KIND } from "@/app/constants";
import type { ReservationDepositRecordRow } from "../models/ReservationDepositRecordRow.type";
import type { ReservationDepositRecorded } from "../models/ReservationDepositRecorded.interface";

export const mapReservationDepositRecorded = (
  row: ReservationDepositRecordRow
): ReservationDepositRecorded => ({
  decision: row.recorded_has_deposit
    ? {
        amount: row.recorded_amount,
        currency: row.recorded_currency,
        kind: RESERVATION_DEPOSIT_DECISION_KIND.RECEIVED,
      }
    : { kind: RESERVATION_DEPOSIT_DECISION_KIND.DECLINED },
  id: row.recorded_has_deposit
    ? row.recorded_deposit_id
    : null,
  recordedByName: row.recorded_by_name,
});
