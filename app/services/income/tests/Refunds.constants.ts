import { CURRENCY_CODE } from "@/app/constants";
import type { Money } from "@/app/utils/money/models/Money.interface";
import type { RefundRange } from "../models/RefundRange.type";
import type { RefundRow } from "../models/RefundRow.interface";

export const DAY_RANGE: RefundRange = {
  startsAt: "2026-10-28T06:00:00.000Z",
  endsAt: "2026-10-29T06:00:00.000Z",
};

export const USD_ROW: RefundRow = {
  amount: 40.25,
  currency: CURRENCY_CODE.USD,
};

export const CRC_ROW: RefundRow = {
  amount: 10000,
  currency: CURRENCY_CODE.CRC,
};

export const USD_MOVEMENT: Money = {
  amount: 40.25,
  currency: CURRENCY_CODE.USD,
};

export const CRC_MOVEMENT: Money = {
  amount: 10000,
  currency: CURRENCY_CODE.CRC,
};

export const BOTH_ROWS = [USD_ROW, CRC_ROW];

export const BOTH_ROWS_COUNT = 2;

export const MORE_ROWS_THAN_RETURNED = 3;

export const POSTGREST_ERROR = {
  name: "PostgrestError",
  message: "permission denied",
  details: "",
  hint: "",
  code: "42501",
};
