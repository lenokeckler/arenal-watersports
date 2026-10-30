import { CURRENCY_CODE } from "@/app/constants";
import type { CurrencyIncomeDisplay } from "../models/CurrencyIncomeDisplay.interface";

export const DOLLAR_DISPLAY: CurrencyIncomeDisplay = {
  currency: CURRENCY_CODE.USD,
  hasMovement: true,
  collected: { amount: 120.5, currency: CURRENCY_CODE.USD },
  refunded: { amount: 20, currency: CURRENCY_CODE.USD },
  net: { amount: 100.5, currency: CURRENCY_CODE.USD },
  isNetNegative: false,
};

export const DOLLAR_COLLECTED_TEXT = "US$ 120.50";
export const DOLLAR_REFUNDED_TEXT = "−US$ 20.00";
export const DOLLAR_NET_TEXT = "US$ 100.50";

export const NEGATIVE_COLON_DISPLAY: CurrencyIncomeDisplay =
  {
    currency: CURRENCY_CODE.CRC,
    hasMovement: true,
    collected: {
      amount: 1000,
      currency: CURRENCY_CODE.CRC,
    },
    refunded: { amount: 3000, currency: CURRENCY_CODE.CRC },
    net: { amount: 2000, currency: CURRENCY_CODE.CRC },
    isNetNegative: true,
  };

export const NEGATIVE_COLON_NET_TEXT = "−menos ₡ 2 000";

export const BALANCED_DOLLAR_DISPLAY: CurrencyIncomeDisplay =
  {
    currency: CURRENCY_CODE.USD,
    hasMovement: true,
    collected: { amount: 30, currency: CURRENCY_CODE.USD },
    refunded: { amount: 30, currency: CURRENCY_CODE.USD },
    net: { amount: 0, currency: CURRENCY_CODE.USD },
    isNetNegative: false,
  };

export const ZERO_DOLLAR_TEXT = "US$ 0.00";

export const CHARGE_ONLY_DOLLAR_DISPLAY: CurrencyIncomeDisplay =
  {
    currency: CURRENCY_CODE.USD,
    hasMovement: true,
    collected: { amount: 30, currency: CURRENCY_CODE.USD },
    refunded: { amount: 0, currency: CURRENCY_CODE.USD },
    net: { amount: 30, currency: CURRENCY_CODE.USD },
    isNetNegative: false,
  };

export const IDLE_COLON_DISPLAY: CurrencyIncomeDisplay = {
  currency: CURRENCY_CODE.CRC,
  hasMovement: false,
  collected: { amount: 0, currency: CURRENCY_CODE.CRC },
  refunded: { amount: 0, currency: CURRENCY_CODE.CRC },
  net: { amount: 0, currency: CURRENCY_CODE.CRC },
  isNetNegative: false,
};

export const HEADING_LEVEL_TWO = 2;
export const TERM_SELECTOR = "dt";
export const TIME_SELECTOR = "time";
export const DEFINITION_SELECTOR = "dd";
export const HIDDEN_SIGN_SELECTOR = "[aria-hidden='true']";
export const ERROR_TEXT_CLASS = "text-error";
