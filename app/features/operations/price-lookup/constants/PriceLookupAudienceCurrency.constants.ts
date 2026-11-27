import {
  CURRENCY_CODE,
  type CurrencyCode,
} from "@/app/constants";
import type { PriceLookupAudience } from "../models/PriceLookupAudience.type";
import { PRICE_LOOKUP_AUDIENCE } from "./PriceLookupAudience.constants";

export const PRICE_LOOKUP_AUDIENCE_CURRENCY: Record<
  PriceLookupAudience,
  CurrencyCode
> = {
  [PRICE_LOOKUP_AUDIENCE.FOREIGN]: CURRENCY_CODE.USD,
  [PRICE_LOOKUP_AUDIENCE.NATIONAL]: CURRENCY_CODE.CRC,
};

export const PRICE_LOOKUP_AUDIENCE_ORDER: readonly PriceLookupAudience[] =
  [
    PRICE_LOOKUP_AUDIENCE.NATIONAL,
    PRICE_LOOKUP_AUDIENCE.FOREIGN,
  ];
