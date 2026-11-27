import { CURRENCY_ORDER } from "@/app/constants";
import { PRICE_LOOKUP_AMOUNT_FIELD } from "../constants/PriceLookupAmountField.constants";
import type { PriceLookupAmountLine } from "../models/PriceLookupAmountLine.interface";
import type { PriceLookupAmounts } from "../models/PriceLookupAmounts.interface";
import { buildPriceLookupAmountLine } from "./buildPriceLookupAmountLine";

export const buildPriceLookupAmountLines = (
  amounts: PriceLookupAmounts
): PriceLookupAmountLine[] =>
  CURRENCY_ORDER.flatMap((currency) => {
    const amount =
      amounts[PRICE_LOOKUP_AMOUNT_FIELD[currency]];
    return amount === null
      ? []
      : [buildPriceLookupAmountLine(currency, amount)];
  });
