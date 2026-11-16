import { CURRENCY_CODE } from "@/app/constants";
import type { ReservationRefundableAmount } from "../models/ReservationRefundableAmount.interface";

export const USD_REFUNDABLE: ReservationRefundableAmount = {
  amount: 30,
  currency: CURRENCY_CODE.USD,
};

export const CRC_REFUNDABLE: ReservationRefundableAmount = {
  amount: 15000,
  currency: CURRENCY_CODE.CRC,
};

export const USD_EMPTY: ReservationRefundableAmount = {
  amount: 0,
  currency: CURRENCY_CODE.USD,
};

export const CRC_EMPTY: ReservationRefundableAmount = {
  amount: 0,
  currency: CURRENCY_CODE.CRC,
};
