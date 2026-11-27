import {
  CURRENCY_CODE,
  RESERVATION_DEPOSIT_DECISION_KIND,
} from "@/app/constants";
import { RESERVATION_DEPOSIT_ERROR } from "../constants/ReservationDepositError.constants";
import type { ReservationDepositRecordRow } from "../models/ReservationDepositRecordRow.type";
import type { ReservationDepositRecorded } from "../models/ReservationDepositRecorded.interface";

export const DEPOSIT_ID =
  "e2c20000-0000-4000-8000-000000000911";
export const RECORDED_BY_NAME = "Ana Mora";

export const RECEIVED_RECORD_ROW: ReservationDepositRecordRow =
  {
    recorded_amount: 200,
    recorded_by_name: RECORDED_BY_NAME,
    recorded_currency: CURRENCY_CODE.USD,
    recorded_deposit_id: DEPOSIT_ID,
    recorded_has_deposit: true,
  };

export const DECLINED_RECORD_ROW = {
  recorded_amount: null,
  recorded_by_name: RECORDED_BY_NAME,
  recorded_currency: null,
  recorded_deposit_id: null,
  recorded_has_deposit: false,
} as unknown as ReservationDepositRecordRow;

export const DEPOSIT_POSTGRES_PREFIX = "P0001: ";

export const DEPOSIT_NON_ERROR_THROWN =
  "Unexpected deposit value";

export const DEPOSIT_SUPABASE_WRAP_PREFIX =
  "Supabase query failed: ";

export const DEPOSIT_SUPABASE_WRAP_SUFFIX = " (P0001)";

export const DEPOSIT_UNEXPECTED_ERROR = new Error(
  "Unexpected deposit failure"
);

export const DEPOSIT_ACCESS_REDIRECT = new Error(
  "NEXT_REDIRECT"
);

export const DEPOSIT_NETWORK_FAILURE = new TypeError(
  "Failed to fetch"
);

export const ALREADY_DECIDED_FAILURE = {
  code: "P0001",
  details: "",
  hint: "",
  message:
    RESERVATION_DEPOSIT_ERROR.MESSAGE.ALREADY_DECIDED,
};

export const RECEIVED_RECORDED: ReservationDepositRecorded =
  {
    decision: {
      amount: 200,
      currency: CURRENCY_CODE.USD,
      kind: RESERVATION_DEPOSIT_DECISION_KIND.RECEIVED,
    },
    id: DEPOSIT_ID,
    recordedByName: RECORDED_BY_NAME,
  };
