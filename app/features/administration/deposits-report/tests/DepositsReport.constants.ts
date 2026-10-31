import {
  CURRENCY_CODE,
  DEPOSIT_STATUS,
} from "@/app/constants";
import type {
  DepositListItem,
  RetainedDepositItem,
} from "@/app/services/deposits";
import { formatMoney } from "@/app/utils/money/formatMoney";

export const USD_HELD_DEPOSIT: DepositListItem = {
  id: "held-usd",
  amount: 50,
  currency: CURRENCY_CODE.USD,
  status: DEPOSIT_STATUS.HELD,
  reservation: {
    code: "RES-0001",
    customerName: "Ana Mora",
  },
};

export const CRC_HELD_DEPOSIT: DepositListItem = {
  id: "held-crc",
  amount: 25000,
  currency: CURRENCY_CODE.CRC,
  status: DEPOSIT_STATUS.HELD,
  reservation: {
    code: "RES-0002",
    customerName: "Luis Vargas",
  },
};

export const MULTILINE_REASON =
  "Paddle broken\nLife vest lost";
export const REAL_REASON = "Equipment damaged";
export const BLANK_REASONS = ["", "   ", "\n"] as const;

export const USD_RETAINED_DEPOSIT: RetainedDepositItem = {
  id: "retained-usd",
  currency: CURRENCY_CODE.USD,
  status: DEPOSIT_STATUS.RETAINED,
  retainedAmount: 30,
  retentionReason: REAL_REASON,
  reservation: {
    code: "RES-0003",
    customerName: "Marta Solis",
  },
};

export const CRC_PARTIAL_DEPOSIT: RetainedDepositItem = {
  id: "retained-crc",
  currency: CURRENCY_CODE.CRC,
  status: DEPOSIT_STATUS.PARTIALLY_RETAINED,
  retainedAmount: 10000,
  retentionReason: "Late return",
  reservation: {
    code: "RES-0004",
    customerName: "Pablo Rojas",
  },
};

export const SERVICE_FAILURE_MESSAGE = "read failed";
export const REDIRECT_MESSAGE = "redirected";
export const HEADING_LEVEL_TWO = 2;
export const HEADING_LEVEL_ONE = 1;
export const ARIA_BUSY_ATTRIBUTE = "aria-busy";
export const ARIA_BUSY_VALUE = "true";
export const ARIA_BUSY_SELECTOR = `[${ARIA_BUSY_ATTRIBUTE}]`;
export const SKELETON_TEXT_PATTERN = /RES-|US\$|₡/;
export const NO_ASSUME_PATTERN = /no asuma/i;

export const USD_RETAINED_AMOUNT_TEXT = formatMoney({
  amount: USD_RETAINED_DEPOSIT.retainedAmount,
  currency: USD_RETAINED_DEPOSIT.currency,
});
export const CRC_RETAINED_AMOUNT_TEXT = formatMoney({
  amount: CRC_PARTIAL_DEPOSIT.retainedAmount,
  currency: CRC_PARTIAL_DEPOSIT.currency,
});
export const CRC_ORIGINAL_AMOUNT_TEXT = formatMoney({
  amount: CRC_HELD_DEPOSIT.amount,
  currency: CRC_HELD_DEPOSIT.currency,
});
