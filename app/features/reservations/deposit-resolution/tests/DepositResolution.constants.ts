import {
  CURRENCY_CODE,
  DEPOSIT_STATUS,
  RESERVATION_STATUS,
} from "@/app/constants";
import type { DepositResolution } from "../models/DepositResolution.interface";
import type { DepositResolutionRecordRow } from "../models/DepositResolutionRecordRow.type";
import type { DepositResolutionRow } from "../models/DepositResolutionRow.type";
import type { DepositResolutionValues } from "../models/DepositResolutionValues.interface";

export const RESOLUTION_DEPOSIT_ID =
  "e2c20000-0000-4000-8000-000000000951";
export const RESOLUTION_RESERVATION_ID =
  "e2c20000-0000-4000-8000-000000000952";
export const MALFORMED_DEPOSIT_ID = "not-a-uuid";
export const DAMAGE_REASON = "Aleta del kayak rota";
export const RESOLVED_BY_NAME = "Ana Mora";

export const CLOSED_ROW: DepositResolutionRow = {
  amount: 200,
  currency: CURRENCY_CODE.USD,
  id: RESOLUTION_DEPOSIT_ID,
  reservation: {
    code: "R-000300",
    customer_name: "Grupo Retorno",
    id: RESOLUTION_RESERVATION_ID,
    status: RESERVATION_STATUS.CLOSED,
  },
  status: DEPOSIT_STATUS.HELD,
};

export const CLOSED_DEPOSIT: DepositResolution = {
  amount: 200,
  code: "R-000300",
  currency: CURRENCY_CODE.USD,
  customerName: "Grupo Retorno",
  id: RESOLUTION_DEPOSIT_ID,
  reservationId: RESOLUTION_RESERVATION_ID,
  reservationStatus: RESERVATION_STATUS.CLOSED,
  status: DEPOSIT_STATUS.HELD,
};

export const PARTIAL_VALUES: DepositResolutionValues = {
  reasonText: DAMAGE_REASON,
  returnedText: "100",
  returnsAll: false,
};

export const PARTIAL_RECORD_ROW: DepositResolutionRecordRow =
  {
    deposit_amount: 200,
    kept_amount: 100,
    resolved_by_name: RESOLVED_BY_NAME,
    resolved_currency: CURRENCY_CODE.USD,
    resolved_deposit_id: RESOLUTION_DEPOSIT_ID,
    resolved_reason: DAMAGE_REASON,
    resolved_status: DEPOSIT_STATUS.PARTIALLY_RETAINED,
    returned_amount: 100,
  };
