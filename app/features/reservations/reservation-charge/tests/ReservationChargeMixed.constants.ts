import { STRING } from "@/app/constants";

export const SECOND_AMOUNT_TEXT_CASES = {
  CRC_TOO_LARGE: "1000000000000",
  EMPTY: STRING.Empty,
  FORMAT: "abc",
  LARGE_VALID: "9999999999.99",
  NOT_POSITIVE: "0",
  TOO_MANY_DECIMALS: "10,005",
  USD_TOO_LARGE: "10000000000",
  VALID: "12000",
} as const;

export const NUMERIC_SECOND_AMOUNT = 12000;
export const OBJECT_SECOND_AMOUNT = { text: "12000" };
export const MISSING_SECOND_AMOUNT_KEY = "secondAmountText";
export const PARTS_INVALID_POSTGRES_MESSAGE =
  "P0001: Charge parts are invalid";
export const PADDED_SECOND_AMOUNT_TEXT = " 12000,5 ";
export const PARSED_SECOND_AMOUNT = 12000.5;
