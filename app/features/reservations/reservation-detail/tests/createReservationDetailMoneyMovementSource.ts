import {
  RESERVATION_DETAIL_CHARGE_KIND,
  RESERVATION_DETAIL_CURRENCY,
} from "../constants/ReservationDetail.constants";
import type { ReservationDetailChargeSource } from "../models/ReservationDetailChargeSource.interface";
import type { ReservationDetailRefundSource } from "../models/ReservationDetailRefundSource.interface";
import { RESERVATION_DETAIL_MOVEMENTS_TEST as movement } from "./ReservationDetailMoneyMovementsTest.constants";

export const createChargeSource = (
  overrides: Partial<ReservationDetailChargeSource> = {}
): ReservationDetailChargeSource => ({
  amount: movement.CHARGE_AMOUNT,
  created_at: movement.CHARGE_TIMESTAMP,
  created_by: movement.CHARGE_WORKER_ID,
  currency: RESERVATION_DETAIL_CURRENCY.CRC,
  id: movement.CHARGE_ID,
  kind: RESERVATION_DETAIL_CHARGE_KIND.TARIFF,
  payment_method: movement.CHARGE_METHOD,
  ...overrides,
});

export const createRefundSource = (
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
