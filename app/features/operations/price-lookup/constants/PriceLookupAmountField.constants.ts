import {
  CURRENCY_CODE,
  type CurrencyCode,
} from "@/app/constants";
import type { PriceLookupAmounts } from "../models/PriceLookupAmounts.interface";

export const PRICE_LOOKUP_AMOUNT_FIELD: Record<
  CurrencyCode,
  keyof PriceLookupAmounts
> = {
  [CURRENCY_CODE.CRC]: "crc",
  [CURRENCY_CODE.USD]: "usd",
};
