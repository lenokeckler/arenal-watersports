import { CURRENCY_CODE } from "@/app/constants";
import type { CurrencyIncome } from "@/app/services/income";

export const DOLLAR_INCOME: CurrencyIncome = {
  currency: CURRENCY_CODE.USD,
  total: 150,
  byPaymentMethod: [
    { key: "tarjeta", name: "Tarjeta", amount: 100 },
    { key: "", name: "", amount: 50 },
  ],
};

export const NO_DOLLAR_INCOME: CurrencyIncome = {
  currency: CURRENCY_CODE.USD,
  total: 0,
  byPaymentMethod: [],
};

export const DOLLAR_TOTAL_TEXT = "US$ 150.00";
export const DOLLAR_CARD_TEXT = "US$ 100.00";
export const DOLLAR_BLANK_METHOD_TEXT = "US$ 50.00";
export const ZERO_DOLLAR_TEXT = "US$ 0.00";
export const EXPECTED_DOLLAR_BAR_WIDTHS = ["100", "50"];

export const HEADING_LEVEL_THREE = 3;

export const BAR_FILL_SELECTOR = "rect";
export const BAR_WIDTH_ATTRIBUTE = "width";
