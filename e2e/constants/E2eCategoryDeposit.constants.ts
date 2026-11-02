import {
  CURRENCY_CODE,
  MONEY_AMOUNT_ISSUE,
} from "@/app/constants";
import type { CategoryDepositAmounts } from "../models/CategoryDepositAmounts.interface";
import type { CategoryDepositInputCase } from "../models/CategoryDepositInputCase.interface";
import type { CategoryDepositSaveCase } from "../models/CategoryDepositSaveCase.interface";

export const E2E_CATEGORY_DEPOSIT_SCREENSHOT_BASENAME =
  "us-adm-14-category-deposit";

export const E2E_CATEGORY_DEPOSIT_SCREENSHOT_STATE = {
  EMPTY: "empty",
  ERROR: "error",
  FILLED: "filled",
} as const;

export const resolveCategoryDepositScreenshotBasename = (
  state: string
): string =>
  `${E2E_CATEGORY_DEPOSIT_SCREENSHOT_BASENAME}-${state}`;

export const E2E_CATEGORY_DEPOSIT_BASE_NAME =
  "E2E Fixture — Depósito";

export const resolveCategoryDepositFixtureName = (
  projectName: string,
  scenario: string
): string =>
  `${E2E_CATEGORY_DEPOSIT_BASE_NAME} (${projectName} · ${scenario})`;

export const E2E_DEPOSIT_INPUT = {
  CHANGED_USD: "350",
  COMMA_USD: "200,50",
  CRC: "100000",
  USD: "200",
} as const;

export const E2E_DEPOSIT_STORED = {
  CHANGED_USD: 350,
  COMMA_USD: 200.5,
  CRC: 100_000,
  USD: 200,
} as const;

export const E2E_DEPOSIT_NONE: CategoryDepositAmounts = {
  depositCrc: null,
  depositUsd: null,
};

export const E2E_DEPOSIT_BOTH: CategoryDepositAmounts = {
  depositCrc: E2E_DEPOSIT_STORED.CRC,
  depositUsd: E2E_DEPOSIT_STORED.USD,
};

export const E2E_DEPOSIT_INVALID_INPUT_CASES: CategoryDepositInputCase[] =
  [
    {
      amountText: "0",
      currency: CURRENCY_CODE.USD,
      issue: MONEY_AMOUNT_ISSUE.NOT_POSITIVE,
      scenario: "zero-usd",
    },
    {
      amountText: "abc",
      currency: CURRENCY_CODE.CRC,
      issue: MONEY_AMOUNT_ISSUE.FORMAT,
      scenario: "letters-crc",
    },
    {
      amountText: "1.005",
      currency: CURRENCY_CODE.USD,
      issue: MONEY_AMOUNT_ISSUE.PRECISION,
      scenario: "precision-usd",
    },
  ];

export const E2E_DEPOSIT_SINGLE_CURRENCY_CASES: CategoryDepositSaveCase[] =
  [
    {
      amountText: E2E_DEPOSIT_INPUT.USD,
      currency: CURRENCY_CODE.USD,
      expected: {
        ...E2E_DEPOSIT_NONE,
        depositUsd: E2E_DEPOSIT_STORED.USD,
      },
      scenario: "only-usd",
    },
    {
      amountText: E2E_DEPOSIT_INPUT.CRC,
      currency: CURRENCY_CODE.CRC,
      expected: {
        ...E2E_DEPOSIT_NONE,
        depositCrc: E2E_DEPOSIT_STORED.CRC,
      },
      scenario: "only-crc",
    },
    {
      amountText: E2E_DEPOSIT_INPUT.COMMA_USD,
      currency: CURRENCY_CODE.USD,
      expected: {
        ...E2E_DEPOSIT_NONE,
        depositUsd: E2E_DEPOSIT_STORED.COMMA_USD,
      },
      scenario: "comma-usd",
    },
  ];
