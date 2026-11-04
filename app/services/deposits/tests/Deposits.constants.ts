import { PostgrestError } from "@supabase/supabase-js";
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

export const SECOND_PAGE = 2;
export const SECOND_PAGE_RANGE = {
  from: 20,
  to: 39,
} as const;
export const FIRST_PAGE_RANGE = {
  from: 0,
  to: 19,
} as const;
export const LAST_PAGE_RANGE = {
  from: 40,
  to: 59,
} as const;
export const MULTI_PAGE_TOTAL_COUNT = 45;
export const MULTI_PAGE_COUNT = 3;
export const TWO_DEPOSITS_COUNT = 2;
export const OUT_OF_RANGE_PAGE = 9;
export const OUT_OF_RANGE_PAGE_RANGE = {
  from: 160,
  to: 179,
} as const;
export const TEST_OPERATION = "read deposits page";

export const OUT_OF_RANGE_ERROR = new PostgrestError({
  code: "PGRST103",
  details: "",
  hint: "",
  message: "Requested range not satisfiable",
});

export const READ_FAILURE = new PostgrestError({
  code: "42501",
  details: "",
  hint: "",
  message: "permission denied",
});

export const POSTGREST_ERROR = {
  name: "PostgrestError",
  message: "permission denied",
  details: "",
  hint: "",
  code: "42501",
};
