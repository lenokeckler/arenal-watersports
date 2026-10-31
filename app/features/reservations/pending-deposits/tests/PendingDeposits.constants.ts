import {
  CURRENCY_CODE,
  DEPOSIT_STATUS,
} from "@/app/constants";
import type { DepositListItem } from "@/app/services/deposits";

export const USD_DEPOSIT: DepositListItem = {
  id: "deposit-usd",
  amount: 50,
  currency: CURRENCY_CODE.USD,
  status: DEPOSIT_STATUS.HELD,
  reservation: {
    code: "RES-0001",
    customerName: "Ana Mora",
  },
};

export const CRC_DEPOSIT: DepositListItem = {
  id: "deposit-crc",
  amount: 25000,
  currency: CURRENCY_CODE.CRC,
  status: DEPOSIT_STATUS.HELD,
  reservation: {
    code: "RES-0002",
    customerName: "Luis Vargas",
  },
};

export const USD_AMOUNT_TEXT = "US$ 50.00";
export const CRC_AMOUNT_TEXT = "₡ 25 000";
export const SERVICE_FAILURE_MESSAGE = "read failed";
export const HEADING_LEVEL_ONE = 1;
export const ARIA_BUSY_ATTRIBUTE = "aria-busy";
export const ARIA_BUSY_VALUE = "true";
