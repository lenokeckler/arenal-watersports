import {
  CURRENCY_CODE,
  MONEY_AMOUNT_ISSUE,
} from "@/app/constants";
import type { CategoryDepositBoundaryCase } from "../models/CategoryDepositBoundaryCase.interface";

const USD_INTEGER_DIGITS = 10;
const CRC_INTEGER_DIGITS = 12;

export const CATEGORY_DEPOSIT_BOUNDARY_CASES: CategoryDepositBoundaryCase[] =
  [
    {
      description: "the USD integer digit maximum",
      currency: CURRENCY_CODE.USD,
      amountText: "9".repeat(USD_INTEGER_DIGITS),
      expectedIssue: null,
    },
    {
      description: "one integer digit over the USD maximum",
      currency: CURRENCY_CODE.USD,
      amountText: "9".repeat(USD_INTEGER_DIGITS + 1),
      expectedIssue: MONEY_AMOUNT_ISSUE.PRECISION,
    },
    {
      description: "the CRC integer digit maximum",
      currency: CURRENCY_CODE.CRC,
      amountText: "9".repeat(CRC_INTEGER_DIGITS),
      expectedIssue: null,
    },
    {
      description: "one integer digit over the CRC maximum",
      currency: CURRENCY_CODE.CRC,
      amountText: "9".repeat(CRC_INTEGER_DIGITS + 1),
      expectedIssue: MONEY_AMOUNT_ISSUE.PRECISION,
    },
    {
      description: "two decimals in USD",
      currency: CURRENCY_CODE.USD,
      amountText: "1.99",
      expectedIssue: null,
    },
    {
      description: "three decimals in USD",
      currency: CURRENCY_CODE.USD,
      amountText: "1.005",
      expectedIssue: MONEY_AMOUNT_ISSUE.PRECISION,
    },
    {
      description: "two decimals in CRC",
      currency: CURRENCY_CODE.CRC,
      amountText: "1.99",
      expectedIssue: null,
    },
    {
      description: "three decimals in CRC",
      currency: CURRENCY_CODE.CRC,
      amountText: "1.005",
      expectedIssue: MONEY_AMOUNT_ISSUE.PRECISION,
    },
    {
      description: "a malformed text that is also too long",
      currency: CURRENCY_CODE.USD,
      amountText: `${"9".repeat(USD_INTEGER_DIGITS + 1)}.5.5`,
      expectedIssue: MONEY_AMOUNT_ISSUE.FORMAT,
    },
    {
      description: "a zero with too many decimals",
      currency: CURRENCY_CODE.CRC,
      amountText: "0.000",
      expectedIssue: MONEY_AMOUNT_ISSUE.PRECISION,
    },
  ];
