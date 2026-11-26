import {
  RESERVATION_DETAIL_CHARGE_KIND,
  RESERVATION_DETAIL_CURRENCY,
} from "../constants/ReservationDetail.constants";
import type { ReservationDetailChargeSource } from "../models/ReservationDetailChargeSource.interface";
import { RESERVATION_DETAIL_MOVEMENTS_TEST as movement } from "./ReservationDetailMoneyMovementsTest.constants";

export const createReservationDetailChargeSource = (
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
