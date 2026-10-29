import { CURRENCY_CODE } from "@/app/constants";
import type {
  CurrencyIncome,
  DailyIncome,
} from "@/app/services/income";

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

export const COLON_INCOME: CurrencyIncome = {
  currency: CURRENCY_CODE.CRC,
  total: 25000,
  byPaymentMethod: [
    { key: "efectivo", name: "Efectivo", amount: 15000 },
    { key: "sinpe", name: "SINPE", amount: 10000 },
  ],
};

export const ID_ATTRIBUTE = "id";

export const NUMBERED_AND_BLANK_METHODS: CurrencyIncome = {
  currency: CURRENCY_CODE.USD,
  total: 30,
  byPaymentMethod: [
    { key: "1", name: "1", amount: 20 },
    { key: "", name: "", amount: 10 },
  ],
};

export const NO_COLON_INCOME: CurrencyIncome = {
  currency: CURRENCY_CODE.CRC,
  total: 0,
  byPaymentMethod: [],
};

export const COLON_TOTAL_TEXT = "₡ 25 000";

export const INCOME_DATE = "2026-10-28";
export const INCOME_DATE_TEXT =
  "miércoles, 28 de octubre de 2026";
export const DATE_TIME_ATTRIBUTE = "datetime";

export const DAY_WITH_BOTH_CURRENCIES: DailyIncome = {
  date: INCOME_DATE,
  currencies: [DOLLAR_INCOME, COLON_INCOME],
};

export const DAY_WITH_ONLY_COLONES: DailyIncome = {
  date: INCOME_DATE,
  currencies: [NO_DOLLAR_INCOME, COLON_INCOME],
};

export const DAY_WITHOUT_INCOME: DailyIncome = {
  date: INCOME_DATE,
  currencies: [NO_DOLLAR_INCOME, NO_COLON_INCOME],
};

export const HEADING_LEVEL_ONE = 1;
export const HEADING_LEVEL_TWO = 2;
export const ARIA_BUSY_ATTRIBUTE = "aria-busy";
export const ARIA_BUSY_TRUE = "true";
