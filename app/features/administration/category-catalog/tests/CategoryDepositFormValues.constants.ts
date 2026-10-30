import {
  CURRENCY_CODE,
  MONEY_AMOUNT_ISSUE,
  type CurrencyCode,
} from "@/app/constants";
import type { CategoryDeposit } from "../models/CategoryDeposit.interface";
import type { CategoryDepositFormValues } from "../models/CategoryDepositFormValues.interface";
import type { CategoryDepositIssueCase } from "../models/CategoryDepositIssueCase.interface";

const DEFAULT_DEPOSIT_CRC_AMOUNT = 100000;
const DEFAULT_DEPOSIT_USD_AMOUNT = 200;

export const EMPTY_CATEGORY_DEPOSIT_FORM_VALUES: CategoryDepositFormValues =
  {
    depositCrc: "",
    depositUsd: "",
  };

export const DEFAULT_CATEGORY_DEPOSIT_FORM_VALUES: CategoryDepositFormValues =
  {
    depositCrc: DEFAULT_DEPOSIT_CRC_AMOUNT.toString(),
    depositUsd: DEFAULT_DEPOSIT_USD_AMOUNT.toString(),
  };

export const CATEGORY_DEPOSIT_ID = "category-deposit-id";

export const DEFAULT_CATEGORY_DEPOSIT: CategoryDeposit = {
  depositCrc: DEFAULT_DEPOSIT_CRC_AMOUNT,
  depositUsd: DEFAULT_DEPOSIT_USD_AMOUNT,
  id: CATEGORY_DEPOSIT_ID,
};

export const CATEGORY_DEPOSIT_FIELD_BY_CURRENCY: Record<
  CurrencyCode,
  keyof CategoryDepositFormValues
> = {
  [CURRENCY_CODE.CRC]: "depositCrc",
  [CURRENCY_CODE.USD]: "depositUsd",
};

export const buildCategoryDepositFormValues = (
  overrides: Partial<CategoryDepositFormValues> = {}
): CategoryDepositFormValues => ({
  ...DEFAULT_CATEGORY_DEPOSIT_FORM_VALUES,
  ...overrides,
});

export const buildCategoryDeposit = (
  overrides: Partial<CategoryDeposit> = {}
): CategoryDeposit => ({
  ...DEFAULT_CATEGORY_DEPOSIT,
  ...overrides,
});

export const INVALID_FORMAT_TEXT = "1,5";
export const INVALID_NOT_POSITIVE_TEXT = "0";
export const ELEVEN_INTEGER_DIGITS_TEXT = "12345678901";
export const THIRTEEN_INTEGER_DIGITS_TEXT = "1234567890123";
export const BLANK_TEXT = "   ";
export const PADDED_VALID_TEXT = "  200  ";
export const DECIMAL_DEPOSIT = 200.5;
export const DECIMAL_DEPOSIT_TEXT = "200.5";

const ISSUE_TEXTS = [
  {
    description: "a malformed amount",
    amountText: INVALID_FORMAT_TEXT,
    issue: MONEY_AMOUNT_ISSUE.FORMAT,
  },
  {
    description: "a zero amount",
    amountText: INVALID_NOT_POSITIVE_TEXT,
    issue: MONEY_AMOUNT_ISSUE.NOT_POSITIVE,
  },
] as const;

export const DEPOSIT_ISSUE_CASES: CategoryDepositIssueCase[] =
  Object.values(CURRENCY_CODE).flatMap((currency) =>
    ISSUE_TEXTS.map((issueText) => ({
      ...issueText,
      currency,
      field: CATEGORY_DEPOSIT_FIELD_BY_CURRENCY[currency],
    }))
  );
