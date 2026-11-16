import { CURRENCY_CODE } from "@/app/constants";
import { RESERVATION_REFUND_ERROR } from "../constants/ReservationRefundError.constants";
import type { ReservationRefundCommand } from "../models/ReservationRefundCommand.interface";
import type { ReservationRefundRecordRow } from "../models/ReservationRefundRecordRow.type";
import type { ReservationRefundRecorded } from "../models/ReservationRefundRecorded.interface";
import { REFUND_RESERVATION_ID } from "./ReservationRefund.constants";

export const REFUND_RECORD_ROW: ReservationRefundRecordRow =
  {
    recorded_by_name: "Ana Mora",
    refund_id: "e2c20000-0000-4000-8000-000000000901",
    refunded_amount: 20,
    refunded_currency: CURRENCY_CODE.USD,
    refunded_reason: "Salida cancelada",
    remaining_amount: 10,
  };

export const REFUND_RECORDED: ReservationRefundRecorded = {
  amount: 20,
  currency: CURRENCY_CODE.USD,
  id: "e2c20000-0000-4000-8000-000000000901",
  reason: "Salida cancelada",
  recordedByName: "Ana Mora",
  remaining: 10,
};

export const VALID_REFUND_COMMAND: ReservationRefundCommand =
  {
    amount: 20,
    currency: CURRENCY_CODE.USD,
    reason: "Salida cancelada",
    reservationId: REFUND_RESERVATION_ID,
  };

export const EXCEEDS_NET_FAILURE = {
  code: "P0001",
  details: "",
  hint: "",
  message: RESERVATION_REFUND_ERROR.MESSAGE.EXCEEDS_NET,
};

export const REFUND_POSTGRES_PREFIX = "P0001: ";

export const REFUND_NON_ERROR_THROWN =
  "Unexpected refund value";

export const REFUND_SUPABASE_WRAP_PREFIX =
  "Supabase query failed: ";

export const REFUND_SUPABASE_WRAP_SUFFIX = " (P0001)";

export const REFUND_REASON_MESSAGES = [
  RESERVATION_REFUND_ERROR.MESSAGE.REASON_INVALID,
  RESERVATION_REFUND_ERROR.MESSAGE.REASON_REQUIRED,
  RESERVATION_REFUND_ERROR.MESSAGE.REASON_TOO_LONG,
];

export const REFUND_UNEXPECTED_ERROR = new Error(
  "Unexpected refund failure"
);

export const REFUND_ACCESS_REDIRECT = new Error(
  "NEXT_REDIRECT"
);

export const REFUND_CONNECTION_HINT = "conexión";
