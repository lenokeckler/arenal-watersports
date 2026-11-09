import {
  CURRENCY_CODE,
  DEPOSIT_STATUS,
} from "@/app/constants";
import type { RetainedDepositItem } from "../models/RetainedDepositItem.interface";
import type { RetainedDepositRow } from "../models/RetainedDepositRow.interface";

export const RETAINED_USD_ROW: RetainedDepositRow = {
  id: "deposit-retained",
  currency: CURRENCY_CODE.USD,
  status: DEPOSIT_STATUS.RETAINED,
  retained_amount: 50,
  retention_reason: "Equipment damaged",
  reservations: {
    code: "RES-0003",
    customer_name: "Marta Solis",
  },
};

export const PARTIAL_CRC_ROW: RetainedDepositRow = {
  id: "deposit-partial",
  currency: CURRENCY_CODE.CRC,
  status: DEPOSIT_STATUS.PARTIALLY_RETAINED,
  retained_amount: 10000.25,
  retention_reason: "Late return",
  reservations: {
    code: "RES-0004",
    customer_name: "Pablo Rojas",
  },
};

export const RETAINED_USD_ITEM: RetainedDepositItem = {
  id: "deposit-retained",
  currency: CURRENCY_CODE.USD,
  status: DEPOSIT_STATUS.RETAINED,
  retainedAmount: 50,
  retentionReason: "Equipment damaged",
  reservation: {
    code: "RES-0003",
    customerName: "Marta Solis",
  },
};

export const PARTIAL_CRC_ITEM: RetainedDepositItem = {
  id: "deposit-partial",
  currency: CURRENCY_CODE.CRC,
  status: DEPOSIT_STATUS.PARTIALLY_RETAINED,
  retainedAmount: 10000.25,
  retentionReason: "Late return",
  reservation: {
    code: "RES-0004",
    customerName: "Pablo Rojas",
  },
};

export const MULTILINE_REASON =
  "Paddle broken\nLife vest lost\r\nNo receipt";
