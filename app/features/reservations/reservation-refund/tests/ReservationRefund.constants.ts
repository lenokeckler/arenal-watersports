import {
  CURRENCY_CODE,
  RESERVATION_STATUS,
} from "@/app/constants";
import type { ReservationRefundableAmount } from "@/app/utils/reservations/models/ReservationRefundableAmount.interface";
import type { ReservationRefund } from "../models/ReservationRefund.interface";
import type { ReservationRefundNetRow } from "../models/ReservationRefundNetRow.type";
import type { ReservationRefundRow } from "../models/ReservationRefundRow.type";

export const REFUND_RESERVATION_ID =
  "e2c20000-0000-4000-8000-000000000801";
export const MALFORMED_RESERVATION_ID = "not-a-uuid";
export const UPPERCASE_RESERVATION_ID =
  REFUND_RESERVATION_ID.toUpperCase();

export const NET_ROWS: ReservationRefundNetRow[] = [
  { currency: CURRENCY_CODE.USD, refundable_amount: 30 },
  { currency: CURRENCY_CODE.CRC, refundable_amount: 15000 },
];

export const EXPECTED_REFUNDABLE: ReservationRefundableAmount[] =
  [
    { amount: 30, currency: CURRENCY_CODE.USD },
    { amount: 15000, currency: CURRENCY_CODE.CRC },
  ];

export const SCHEDULED_ROW: ReservationRefundRow = {
  code: "R-000280",
  customer_name: "Grupo Devuelto",
  id: REFUND_RESERVATION_ID,
  parent_reservation_id: null,
  starts_at: "2026-11-02T20:30:00+00:00",
  status: RESERVATION_STATUS.SCHEDULED,
};

export const EXPECTED_SCHEDULED: ReservationRefund = {
  code: "R-000280",
  customerName: "Grupo Devuelto",
  date: "2026-11-02",
  id: REFUND_RESERVATION_ID,
  parentReservationId: null,
  refundable: EXPECTED_REFUNDABLE,
  status: RESERVATION_STATUS.SCHEDULED,
  time: "14:30",
};

export const REFUND_READ_FAILURE = {
  code: "XX000",
  details: "",
  hint: "",
  message: "database unavailable",
};
