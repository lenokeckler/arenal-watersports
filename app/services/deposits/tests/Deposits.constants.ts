import {
  CURRENCY_CODE,
  DEPOSIT_STATUS,
} from "@/app/constants";
import type { DepositRow } from "../models/DepositRow.interface";
import type { DepositListItem } from "../models/DepositListItem.interface";

export const USD_DEPOSIT_ROW: DepositRow = {
  id: "deposit-usd",
  amount: 50,
  currency: CURRENCY_CODE.USD,
  status: DEPOSIT_STATUS.HELD,
  reservations: {
    code: "RES-0001",
    customer_name: "Ana Mora",
  },
};

export const CRC_DEPOSIT_ROW: DepositRow = {
  id: "deposit-crc",
  amount: 25000.5,
  currency: CURRENCY_CODE.CRC,
  status: DEPOSIT_STATUS.HELD,
  reservations: {
    code: "RES-0002",
    customer_name: "Luis Vargas",
  },
};

export const USD_DEPOSIT_ITEM: DepositListItem = {
  id: "deposit-usd",
  amount: 50,
  currency: CURRENCY_CODE.USD,
  status: DEPOSIT_STATUS.HELD,
  reservation: {
    code: "RES-0001",
    customerName: "Ana Mora",
  },
};

export const CRC_DEPOSIT_ITEM: DepositListItem = {
  id: "deposit-crc",
  amount: 25000.5,
  currency: CURRENCY_CODE.CRC,
  status: DEPOSIT_STATUS.HELD,
  reservation: {
    code: "RES-0002",
    customerName: "Luis Vargas",
  },
};

export const MULTIPLE_STATUSES = [
  DEPOSIT_STATUS.HELD,
  DEPOSIT_STATUS.RETAINED,
] as const;

export const POSTGREST_ERROR = {
  name: "PostgrestError",
  message: "permission denied",
  details: "",
  hint: "",
  code: "42501",
};
