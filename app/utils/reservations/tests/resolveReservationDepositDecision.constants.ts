import { CURRENCY_CODE } from "@/app/constants";

export const FIRST_DEPOSIT = {
  amount: 200,
  currency: CURRENCY_CODE.USD,
} as const;

export const SECOND_DEPOSIT = {
  amount: 100000,
  currency: CURRENCY_CODE.CRC,
} as const;
