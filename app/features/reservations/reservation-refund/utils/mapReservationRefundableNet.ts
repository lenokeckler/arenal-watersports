import type { ReservationRefundableAmount } from "@/app/utils/reservations/models/ReservationRefundableAmount.interface";
import type { ReservationRefundNetRow } from "../models/ReservationRefundNetRow.type";

export const mapReservationRefundableNet = (
  rows: readonly ReservationRefundNetRow[]
): ReservationRefundableAmount[] =>
  rows.map((row) => ({
    amount: row.refundable_amount,
    currency: row.currency,
  }));
