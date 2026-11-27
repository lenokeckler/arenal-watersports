import {
  CURRENCY_CODE,
  type CurrencyCode,
} from "@/app/constants";
import type { TariffAmounts } from "../models/TariffAmounts.interface";

export const TARIFF_CURRENCY_AMOUNT_FIELD: Record<
  CurrencyCode,
  keyof TariffAmounts
> = {
  [CURRENCY_CODE.CRC]: "crc",
  [CURRENCY_CODE.USD]: "usd",
};
