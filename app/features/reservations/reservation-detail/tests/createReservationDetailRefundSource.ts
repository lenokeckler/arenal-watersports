import { RESERVATION_DETAIL_CURRENCY } from "../constants/ReservationDetail.constants";
import type { ReservationDetailRefundSource } from "../models/ReservationDetailRefundSource.interface";
import { RESERVATION_DETAIL_MOVEMENTS_TEST as movement } from "./ReservationDetailMoneyMovementsTest.constants";

export const createReservationDetailRefundSource = (
  overrides: Partial<ReservationDetailRefundSource> = {}
): ReservationDetailRefundSource => ({
  amount: movement.REFUND_AMOUNT,
  created_at: movement.REFUND_TIMESTAMP,
  created_by: movement.REFUND_WORKER_ID,
  currency: RESERVATION_DETAIL_CURRENCY.CRC,
  id: movement.REFUND_ID,
  reason: movement.REFUND_REASON,
  ...overrides,
});
