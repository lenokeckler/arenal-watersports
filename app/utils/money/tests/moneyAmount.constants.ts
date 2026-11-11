import { MONEY_AMOUNT_ISSUE } from "@/app/constants";
import type { MoneyAmountIssueCase } from "../models/MoneyAmountIssueCase.interface";
import type { MoneyAmountLimits } from "../models/MoneyAmountLimits.interface";
import type { MoneyAmountParseCase } from "../models/MoneyAmountParseCase.interface";

const MAX_INTEGER_DIGITS = 10;
const DECIMAL_PLACES = 2;
const NO_DECIMAL_PLACES = 0;
const LONG_ZERO_PADDING_LENGTH = MAX_INTEGER_DIGITS + 1;

export const MONEY_AMOUNT_LIMITS: MoneyAmountLimits = {
  decimalPlaces: DECIMAL_PLACES,
  maxIntegerDigits: MAX_INTEGER_DIGITS,
};

export const MAX_INTEGER_AMOUNT_TEXT = "9".repeat(
  MAX_INTEGER_DIGITS
);
export const OVER_MAX_INTEGER_AMOUNT_TEXT = "9".repeat(
  MAX_INTEGER_DIGITS + 1
);

export const MONEY_AMOUNT_ISSUE_CASES: MoneyAmountIssueCase[] =
  [
    { amountText: "200", expectedIssue: null },
    { amountText: "100000", expectedIssue: null },
    { amountText: "200.5", expectedIssue: null },
    { amountText: "0.01", expectedIssue: null },
    { amountText: "007", expectedIssue: null },
    { amountText: "00012", expectedIssue: null },
    {
      amountText: `${"0".repeat(LONG_ZERO_PADDING_LENGTH)}1`,
      expectedIssue: null,
    },
    {
      amountText: MAX_INTEGER_AMOUNT_TEXT,
      expectedIssue: null,
    },
    {
      amountText: `${MAX_INTEGER_AMOUNT_TEXT}.99`,
      expectedIssue: null,
    },
    {
      amountText: "abc",
      expectedIssue: MONEY_AMOUNT_ISSUE.FORMAT,
    },
    {
      amountText: "1,5",
      expectedIssue: null,
    },
    {
      amountText: "200,50",
      expectedIssue: null,
    },
    {
      amountText: "100,000",
      expectedIssue: MONEY_AMOUNT_ISSUE.PRECISION,
    },
    {
      amountText: "1,2,3",
      expectedIssue: MONEY_AMOUNT_ISSUE.FORMAT,
    },
    {
      amountText: "1.5,5",
      expectedIssue: MONEY_AMOUNT_ISSUE.FORMAT,
    },
    {
      amountText: "-5",
      expectedIssue: MONEY_AMOUNT_ISSUE.FORMAT,
    },
    {
      amountText: "+5",
      expectedIssue: MONEY_AMOUNT_ISSUE.FORMAT,
    },
    {
      amountText: "1e3",
      expectedIssue: MONEY_AMOUNT_ISSUE.FORMAT,
    },
    {
      amountText: "1.2.3",
      expectedIssue: MONEY_AMOUNT_ISSUE.FORMAT,
    },
    {
      amountText: ".5",
      expectedIssue: MONEY_AMOUNT_ISSUE.FORMAT,
    },
    {
      amountText: "5.",
      expectedIssue: MONEY_AMOUNT_ISSUE.FORMAT,
    },
    {
      amountText: "$5",
      expectedIssue: MONEY_AMOUNT_ISSUE.FORMAT,
    },
    {
      amountText: "1 000",
      expectedIssue: MONEY_AMOUNT_ISSUE.FORMAT,
    },
    {
      amountText: "1.005",
      expectedIssue: MONEY_AMOUNT_ISSUE.PRECISION,
    },
    {
      amountText: OVER_MAX_INTEGER_AMOUNT_TEXT,
      expectedIssue: MONEY_AMOUNT_ISSUE.PRECISION,
    },
    {
      amountText: "0",
      expectedIssue: MONEY_AMOUNT_ISSUE.NOT_POSITIVE,
    },
    {
      amountText: "0.00",
      expectedIssue: MONEY_AMOUNT_ISSUE.NOT_POSITIVE,
    },
    {
      amountText: "000",
      expectedIssue: MONEY_AMOUNT_ISSUE.NOT_POSITIVE,
    },
  ];

export const STRICTER_DECIMAL_LIMITS: MoneyAmountLimits = {
  ...MONEY_AMOUNT_LIMITS,
  decimalPlaces: NO_DECIMAL_PLACES,
};

export const MONEY_AMOUNT_PARSE_CASES: MoneyAmountParseCase[] =
  [
    { amountText: "", expectedAmount: null },
    { amountText: "   ", expectedAmount: null },
    { amountText: "200", expectedAmount: 200 },
    { amountText: " 100000 ", expectedAmount: 100000 },
    { amountText: "200.50", expectedAmount: 200.5 },
    { amountText: "200,50", expectedAmount: 200.5 },
    { amountText: "0.01", expectedAmount: 0.01 },
  ];
