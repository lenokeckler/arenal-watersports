import { CURRENCY_CODE } from "@/app/constants";
import type { ReservationRefundableAmount } from "@/app/utils/reservations/models/ReservationRefundableAmount.interface";
import {
  AVAILABLE_CRC,
  AVAILABLE_USD,
} from "./ReservationRefundValues.constants";

export const BOTH_REFUNDABLE: ReservationRefundableAmount[] =
  [
    { amount: AVAILABLE_USD, currency: CURRENCY_CODE.USD },
    { amount: AVAILABLE_CRC, currency: CURRENCY_CODE.CRC },
  ];

export const USD_ONLY_REFUNDABLE: ReservationRefundableAmount[] =
  [
    { amount: AVAILABLE_USD, currency: CURRENCY_CODE.USD },
    { amount: 0, currency: CURRENCY_CODE.CRC },
  ];

export const CRC_ONLY_REFUNDABLE: ReservationRefundableAmount[] =
  [
    { amount: 0, currency: CURRENCY_CODE.USD },
    { amount: AVAILABLE_CRC, currency: CURRENCY_CODE.CRC },
  ];

export const NOTHING_REFUNDABLE: ReservationRefundableAmount[] =
  [
    { amount: 0, currency: CURRENCY_CODE.USD },
    { amount: 0, currency: CURRENCY_CODE.CRC },
  ];

export const NETWORK_FAILURE = new Error("Failed to fetch");
