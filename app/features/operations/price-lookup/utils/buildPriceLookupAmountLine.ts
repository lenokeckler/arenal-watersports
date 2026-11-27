import {
  CURRENCY_NAME_COPY,
  type CurrencyCode,
} from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import type { PriceLookupAmountLine } from "../models/PriceLookupAmountLine.interface";

export const buildPriceLookupAmountLine = (
  currency: CurrencyCode,
  amount: number
): PriceLookupAmountLine => ({
  currencyName: CURRENCY_NAME_COPY[currency],
  text: formatMoney({ amount, currency }),
});
