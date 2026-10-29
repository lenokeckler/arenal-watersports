import type { PaymentMethodIncome } from "@/app/services/income";

export const LARGEST_AMOUNT = 400;
export const HALF_OF_LARGEST = 200;
export const EXPECTED_HALF_PERCENT = 50;
export const EXPECTED_FULL_PERCENT = 100;
export const ROUNDED_AMOUNT = 133.4;
export const EXPECTED_ROUNDED_PERCENT = 33;
export const TINY_AMOUNT = 0.5;
export const EXPECTED_MIN_PERCENT = 3;
export const NO_LARGEST_AMOUNT = 0;

export const NAMED_METHOD: PaymentMethodIncome = {
  key: "sinpe móvil",
  name: "SINPE Móvil",
  amount: 25000,
};
export const BLANK_METHOD: PaymentMethodIncome = {
  key: "",
  name: "",
  amount: 25000,
};

export const INCOME_DATE = "2026-10-28";
export const EXPECTED_INCOME_DATE_TEXT =
  "miércoles, 28 de octubre de 2026";
export const NEW_YEAR_DATE = "2027-01-01";
export const EXPECTED_NEW_YEAR_DATE_TEXT =
  "viernes, 1 de enero de 2027";
