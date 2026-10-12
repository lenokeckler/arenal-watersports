import {
  CURRENCY_SYMBOL,
  CURRENCY_SYMBOL_SEPARATOR,
  MONEY_FORMAT,
} from "@/app/constants";
import type { Money } from "./models/Money.interface";

export const formatMoney = ({
  amount,
  currency,
}: Money): string => {
  const {
    locale,
    wholeAmountOptions,
    fractionalAmountOptions,
  } = MONEY_FORMAT[currency];
  const options = Number.isInteger(amount)
    ? wholeAmountOptions
    : fractionalAmountOptions;
  const digits = new Intl.NumberFormat(
    locale,
    options
  ).format(amount);
  return `${CURRENCY_SYMBOL[currency]}${CURRENCY_SYMBOL_SEPARATOR}${digits}`;
};
